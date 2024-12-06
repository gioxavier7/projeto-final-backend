/*objetivo: API para manipular dados de alunos utilzando o método GET
 * data: 29/11/24
 * dev: giovanna
 * versão: 1.0
 */

const express = require('express')
const cors = require('cors')
const bodyParse = require('body-parser')

const app = express()

app.use((request, response, next) => {
    response.header('Access-Control-Allow-Origin', '*')
    response.header('Access-Control-Allow-Methods', 'GET')

    app.use(cors())

    next()
})

const alunosCursos = require('./modulo/funcoes.js')

// endpoint dos filtros
app.get('/v1/lion-school/alunos/filtro', cors(), async function (request, response){
    const { status, curso, conclusao } = request.query
    let dadosEscola

    if(status && !curso && !conclusao){
        dadosEscola = alunosCursos.getAlunoStatus(status)
    }else if (status && curso && !conclusao){
        dadosEscola = alunosCursos.getListaCursoStatus(curso, status)
    }else if(curso && conclusao && !status){
        dadosEscola = alunosCursos.getListaAlunosConclusao(curso, conclusao)
    }else{
        response.status(400).json({
            status: 400,
            message: 'Parâmetros insuficientes ou inválidos. Verifique a documentação.'
        })
        return
    }

    if(dadosEscola){
        response.status(200).json(dadosEscola)
    }else{
        response.status(404).json({
            status: 404,
            message: 'Não foram encontrados dados para retornar.'
        });
    }
});

// endpoint para retornar lista de cursos
app.get('/v1/lion-school/cursos', cors(), async function(request, response){

    let dadosEscola = alunosCursos.getListaDeCursos()

    if(dadosEscola){
        response.status(200)
        response.json(dadosEscola)
    }else{
        response.status(404)
        response.json({'status': 404, 'message': 'Não foram encontrados dados para retorar.'})
    }
})

// endpoint para retornar todos os alunos matriculados
app.get('/v1/lion-school/alunos', cors(), async function(request, response){

    let dadosEscola = alunosCursos.getListaMatriculados()

    if(dadosEscola){
        response.status(200)
        response.json(dadosEscola)
    }else{
        response.status(404)
        response.json({'status': 404, 'message': 'Não foram encontrados dados para retorar.'})
    }
})


// endpoint para retornar informações de um aluno específico com base no número de matrícula
app.get('/v1/lion-school/alunos/matricula/:numeroMatricula', cors(), async function(request, response){

    let matricula = request.params.numeroMatricula

    let dadosEscola = alunosCursos.getAluno(matricula)

    if(dadosEscola){
        response.status(200)
        response.json(dadosEscola)
    }else{
        response.status(404)
        response.json({'status': 404, 'message': 'Não foram encontrados dados para retornar.'})
    }
})

// endpoint para retornar lista de todos os alunos matriculados no curso especificado. DS ou REDES
app.get('/v1/lion-school/alunos/cursos/:cursoMatricula', cors(), async function(request, response){

    let curso = request.params.cursoMatricula

    let dadosEscola = alunosCursos.getAlunoCurso(curso)

    if(dadosEscola){
        response.status(200)
        response.json(dadosEscola)
    }else{
        response.status(404)
        response.json({'status': 404, 'message': 'Não foram encontrados dados para retornar.'})
    }
})

// api aguardando novas requisições
app.listen('8080', function(){
    console.log('API aguardando novas requisições...')
})