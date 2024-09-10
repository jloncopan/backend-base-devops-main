pipeline {
    agent any
    stages {
        stage ('Construir y testear') {
            agent {
                docker {
                    image 'node:20.11.1-alpine3.19'
                }
            }

        }

    }


}