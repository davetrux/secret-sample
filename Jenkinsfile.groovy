#!/usr/bin/env groovy

import hudson.model.Hudson

// git credentials ID can be obtained by clicking on the "Credentials" link within jenkins and using the "ID" for the appropriate ssh key
static final String GIT_CREDENTIALS_ID = '<GETTHISFROMJENKINS>'
static final String GIT_URL = 'git@github.com:davetrux/secret-sample.git'
static final String BUILD_TYPE_DEV = 'Development'
static final String BUILD_TYPE_RESET = 'Reset'
static boolean lastBuildFailed = false;


properties(
    [
        parameters([choice(choices: [BUILD_TYPE_DEV, BUILD_TYPE_RESET], description: 'Reset restores the database to starting state', name: 'BUILD_TYPE')]), 
    ])

// this job runs on the "dev" build node
node('dev') {
    
    // Clean the workspace
    deleteDir() 
    withEnv(["PATH=/bin:/sbin:/usr/local/bin:/usr/bin:/usr/local/sbin:/usr/sbin"]) {
        try {

            stage('git checkout') {
                git credentialsId: GIT_CREDENTIALS_ID, url: GIT_URL
                setWorkspace()
                setExecutePermissions()
            }

            echo "Build type: ${params.BUILD_TYPE}"

            currentBuild.result = 'SUCCESS'
            
            switch (params.BUILD_TYPE) {
                case BUILD_TYPE_DEV:
                    stage('npm install') {
                        dir ('sample-service') {
                            sh 'npm install'
                        }
                    }
                   stage('Docker') {
                       sh './build.sh'
                   }
                   stage('Init Database') {
                       sh './data.sh'
                   }
                    break
                case BUILD_TYPE_RESET:
                   stage('Data Reset') {
                       sh './data.sh'
                   }
                    break
                default:
                    echo "Unsupported build type!"
                    currentBuild.result = 'FAILURE'
                    break
            }
        } catch (err) { 
            currentBuild.result = 'FAILURE'
            throw err //rethrow exception to prevent the build from proceeding
        } 
    }
}

// work-around: workspace environment variable is not available within jenkins pipeline projects
void setWorkspace() {
    env.WORKSPACE = pwd() + 'sample-service'
    echo "Workspace: ${env.WORKSPACE}"
}

// ensure build script has execute permissions
void setExecutePermissions() {
    echo "Setting Execute Permissons"
    script {
        sh 'chmod +x build.sh'
        sh 'chmod +x data.sh'
    }
}