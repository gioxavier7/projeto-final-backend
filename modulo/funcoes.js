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

// função que retorna os alunos através do status (finalizado ou cursando)
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

// função que retorna lista de alunos matriculados em um curso especificado e com base em um status da disciplina Aprovado, Reprovado ou EXAME
const getListaCursoStatus = function(curso, disciplina) {
    let entradaCurso = String(curso).toUpperCase()
    let entradaDisciplina = String(disciplina).toUpperCase()
    let dadosAlunos = listaDeAlunos.alunos
    let listaAlunos = {
        curso: entradaCurso,
        status: entradaDisciplina,
        alunos: []
    }
    let status = false;

    dadosAlunos.forEach(function(valor){
        let listaFinal = valor
        let listaDisciplinas = []

        listaFinal.curso.forEach(function(valorCurso){
            let cursoAluno = valorCurso;

            if(String(cursoAluno.sigla).toUpperCase() === entradaCurso){
                cursoAluno.disciplinas.forEach(function(valorDisciplina){
                    if (String(valorDisciplina.status).toUpperCase() === entradaDisciplina){
                        listaDisciplinas.push(valorDisciplina)
                        status = true
                    }
                })

                cursoAluno.disciplinas = listaDisciplinas
            }
        })

        if(status === true){
            listaAlunos.alunos.push(listaFinal)
        }
    })

    if(status === true){
        return listaAlunos
    }else{
        return status
    }
}

// função que retorna a lista de alunos matriculados em um curso especificado e com base no ano de conclusão
const getListaAlunosConclusao = function(curso, conclusao){
        let entradaCurso = String(curso).toUpperCase()
        let entradaConclusao = Number(conclusao)
        let dadosAlunos = listaDeAlunos.alunos
        let status = false
        let listaAlunos = {
            curso: entradaCurso,
            anoConclusao: entradaConclusao,
            alunos:[]
        }
    
        dadosAlunos.forEach(function(valor){
            valor.curso.forEach(function(valorCurso){
                if(String(valorCurso.sigla).toUpperCase() == entradaCurso && Number(valorCurso.conclusao) == entradaConclusao){
                    listaAlunos.alunos.push(valor)
                    status = true
                }
            })
        })
    
        if(status === true){
            return listaAlunos
        }else{
            return status
        }
}

module.exports = {
    getListaDeCursos,
    getListaMatriculados,
    getAluno,
    getAlunoCurso,
    getAlunoStatus,
    getListaCursoStatus,
    getListaAlunosConclusao
}

// console.log(getListaAlunosConclusao('ds', '2022'))
// console.log(getListaCursoStatus('rds', 'exame'))
// console.log(getAlunoStatus('finalizado'))
// console.log(getAlunoCurso('ds'))
// console.log(getAluno('20151001002'))
// console.log(getListaMatriculados())
// console.log(getListaDeCursos())