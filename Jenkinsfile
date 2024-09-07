pipeline {
    agent any

    environment {
        DOCKER_IMAGE = 'frontend-image'  // 로컬에서 사용할 이미지 이름
        DOCKER_TAG = 'latest'
    }

    stages {
        stage('Cleanup Workspace') {
            steps {
                cleanWs()  // 빌드 시작 전에 워크스페이스 정리
            }
        }

        stage('Git Clone') {
            steps {
                git branch: 'main', url: 'https://github.com/KMBBJ/KMBBJ_FRONT.git'
            }
        }

        stage('Build Docker Image') {
            steps {
                dir('kmbbj') {
                    sh 'docker build -t $DOCKER_IMAGE:$DOCKER_TAG .'
                }
            }
        }

        stage('Save Docker Image') {
            steps {
                // Docker 이미지를 tar 파일로 저장
                sh 'docker save -o $DOCKER_IMAGE.tar $DOCKER_IMAGE:$DOCKER_TAG'
            }
        }
        stage('Load and Deploy Docker Image on GCP') {
            steps {
                script{
                    withCredentials([
                            string(credentialsId: 'GCP_IP', variable: 'GCP_IP'),
                            string(credentialsId: 'REACT_APP_API_BASE_URL', variable: 'REACT_APP_API_BASE_URL')
                        ]){
                        sshagent(credentials: ['kmbbj123']) {
                            sh 'scp -o StrictHostKeyChecking=no $DOCKER_IMAGE.tar kmbbj123@${GCP_IP}:/home/kmbbj123/front/'
                            sh '''
                                ssh -o StrictHostKeyChecking=no kmbbj123@${GCP_IP} "
                                docker load -i /home/kmbbj123/front/$DOCKER_IMAGE.tar && \
                                docker stop kmbbj-frontend || true && \
                                docker rm kmbbj-frontend || true && \
                                docker run -d --name kmbbj-frontend \
                                -e NODE_ENV=production \
                                -e REACT_APP_API_BASE_URL=${REACT_APP_API_BASE_URL} \
                                -p 3000:3000 $DOCKER_IMAGE:$DOCKER_TAG && \
                                docker network connect my-network kmbbj-frontend && \
                                rm /home/kmbbj123/front/$DOCKER_IMAGE.tar
                                "
                            '''
                        }
                    }
                }
            }
        }
    }

    post {
        always {
            cleanWs()  // 빌드 후 워크스페이스 정리
        }
        success {
            echo "빌드 성공 후 알림 전송 시작"
            script {
                withCredentials([string(credentialsId: 'kmbbj_jenkins_build_alarm', variable: 'DISCORD')]) {
                    def changeLog = ""
                    for (changeSet in currentBuild.changeSets) {
                        for (entry in changeSet.items) {
                            def shortMsg = entry.msg.take(50)
                            changeLog += "* ${shortMsg} [${entry.author}]\n"
                        }
                    }
                    if (!changeLog) {
                        changeLog = "No changes in this build."
                    }
                    discordSend description: "${changeLog}",
                    footer: "내 코드가 돌아 간다고? 거짓말 하지마",
                    link: env.BUILD_URL, result: currentBuild.currentResult,
                    title: "KMBBJ_CI/CD \nSUCCESS",
                    webhookURL: "$DISCORD"
                }
            }
        }

        failure {
            echo "빌드 실패 후 알림 전송 시작"  // 디버깅을 위한 메시지
            withCredentials([string(credentialsId: 'kmbbj_jenkins_build_alarm', variable: 'DISCORD')]) {
                discordSend description: """
                제목 : ${currentBuild.displayName}
                결과 : ${currentBuild.result}
                실행 시간 : ${currentBuild.duration / 1000}s
                """,
                link: env.BUILD_URL, result: currentBuild.currentResult,
                title: "${env.JOB_NAME} : ${currentBuild.displayName} 실패",
                webhookURL: "$DISCORD"
            }
        }
    }
}