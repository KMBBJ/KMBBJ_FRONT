pipeline {
    agent any

    environment {
        DOCKER_IMAGE = 'frontend-image'  // 로컬에서 사용할 이미지 이름
        DOCKER_TAG = 'latest'
    }

    stages {
        stage('Git Clone') {
            steps {
                git branch: 'main', url: 'https://github.com/KMBBJ/KMBBJ_FRONT.git'
            }
        }

        stage('Build Docker Image') {
            steps {
                sh 'docker build -t $DOCKER_IMAGE:$DOCKER_TAG .'
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
                            sh 'scp $DOCKER_IMAGE.tar kmbbj123@${GCP_IP}:/home/kmbbj123/front/'
                            sh '''
                                ssh kmbbj123@${GCP_IP} "
                                docker load -i /home/kmbbj123/front/$DOCKER_IMAGE.tar && \
                                docker stop kmbbj-frontend || true && \
                                docker rm kmbbj-frontend || true && \
                                docker run -d --name kmbbj-frontend \
                                -e NODE_ENV=production \
                                -e REACT_APP_API_BASE_URL=${REACT_APP_API_BASE_URL} \
                                -p 3000:3000 $DOCKER_IMAGE:$DOCKER_TAG"
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
    }
}