/*
 *objetivo: projeto final - manipular array e json
 data: 22/11/2024
 dev: giovanna
 versão: 1.0 
 */

var listaDeAlunos = require('./alunos')
var listaDeCursos = require('./cursos')

// função que retorna a lista dos cursos
 const getListaDeCursos = function(){
    let dadosCursos = listaDeCursos.cursos
    let status = false
    let listaCursos = {
        curso: []
    }

    dadosCursos.forEach(function(valor){
        listaCursos.curso.push(valor.nome)
        listaCursos.curso.push(valor.sigla)
        listaCursos.curso.push(valor.icone)
        listaCursos.curso.push(valor.carga)
        status = true
    })

    if(status === true){
        return listaCursos
    }else{
        return status
    }
}

// função que retorna os alunos matriculados
const getListaMatriculados = function(){
    let dadosMatricula = listaDeAlunos.alunos
    let status = false
    let listaMatricula = {
        alunos: []
    }

    dadosMatricula.forEach(function(valor){
        listaMatricula.alunos.push(valor)
        status = true
    })

    if(status === true){
        return listaMatricula
    }else{
        return status
    }
}

// função que retorna dados de um aluno específico pela matrícula
const getAluno = function(matricula){
    let dadosAlunos = listaDeAlunos.alunos
    let status = false
    let matriculaAluno = String(matricula)
    let matriculaEscolhida = ''

    dadosAlunos.forEach(function(valor){
        if(String(valor.matricula) === matriculaAluno){
            matriculaEscolhida = valor
            status = true
        }
    })

    if(status === true){
        return matriculaEscolhida
    }else{
        return status
    }
    
}

// função que retorna todos os alunos de determinado curso
const getAlunoCurso = function(sigla){
    let dadosAlunos = listaDeAlunos.alunos
    let status = false
    let alunoCurso = String(sigla).toUpperCase()
    let alunos = {
        matriculaAlunos: []
    }

    dadosAlunos.forEach(function(valor){
        valor.curso.forEach(function(cursoEscolhido){
            if(String(cursoEscolhido.sigla).toUpperCase() === alunoCurso){
                alunos.matriculaAlunos.push(valor)
                status = true
            }
        })
    })

    if(status === true){
        return alunos
    }else{
        return status
    }
}

// função que retorna os alunos através do status
const getAlunoStatus = function(status){
    let dadosAlunos = listaDeAlunos.alunos
    let statusTrueFalse = false
    let statusAluno = String(status).toUpperCase()
    let listaStatus = {
        alunos: []
    }

    dadosAlunos.forEach(function(valor){
        if(String(valor.status).toUpperCase() === statusAluno){
            listaStatus.alunos.push(valor)
            statusTrueFalse = true
        }
    })

    if(statusTrueFalse === true){
        return listaStatus
    }else{
        return statusTrueFalse
    }

}

// função que retorna alunos matriculados em um curso especificado e com base no ano de conclusão 
const getListaCursoStatus = function(curso, status){
    dadosCursoStatus = listaDeAlunos.alunos
    let cursoEscolhido = String(curso).toUpperCase()
    let StatusEscolhido = String(status).toUpperCase()
    let statusTrueFalse = false
    let listaAlunos = {
        matriculaAlunos: []
    }

    dadosCursoStatus.forEach(function(valor){
        listaAlunos.matriculaAlunos.push(valor)

        valor.curso.forEach(function(valorCurso){
            listaAlunos.matriculaAlunos.push(valorCurso.sigla)

            valorCurso.disciplinas.forEach(function(valor))
        })
    })
}

// console.log(getAlunoStatus('finalizado'))
// console.log(getAlunoCurso('ds'))
// console.log(getAluno('20151001002'))
// console.log(getListaMatriculados())
// console.log(getListaDeCursos())