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
const getListaCursoStatus = function(curso, statusDisciplina){
    let entradaCurso = String(curso).toUpperCase()
    let entradaStatus = String(statusDisciplina).toUpperCase()
    let dadosAlunos = listaDeAlunos.alunos
    let listaFiltrada ={
        curso: entradaCurso,
        status: entradaStatus,
        alunos: []
    }
    let status = false

    dadosAlunos.forEach(function(aluno){
        let alunoFiltrado = {
            nome: aluno.nome,
            matricula: aluno.matricula,
            sexo: aluno.sexo,
            foto: aluno.foto,
            cursos: []
        }
        let encontrouDisciplina = false

        aluno.curso.forEach(function(cursoAtual){
            if(String(cursoAtual.sigla).toUpperCase() === entradaCurso){
                let disciplinasFiltradas = []

                cursoAtual.disciplinas.forEach(function(disciplina) {
                    if(String(disciplina.status).toUpperCase() === entradaStatus){
                        disciplinasFiltradas.push({
                            nome: disciplina.nome,
                            carga: disciplina.carga,
                            media: disciplina.media,
                            status: disciplina.status
                        })
                        encontrouDisciplina = true
                    }
                })

                if(disciplinasFiltradas.length > 0){
                    alunoFiltrado.cursos.push({
                        nome: cursoAtual.nome,
                        sigla: cursoAtual.sigla,
                        disciplinas: disciplinasFiltradas
                    })
                }
            }
        })

        if(encontrouDisciplina){
            listaFiltrada.alunos.push(alunoFiltrado)
            status = true
        }
    })

    if(status){
        return listaFiltrada
    }else{
        return false
    }
}

// Função que retorna os alunos matriculados em um curso específico e com base no ano de conclusão
const getListaAlunosConclusao = function(curso, anoConclusao) {
    let cursoSigla = String(curso).toUpperCase()
    let ano = Number(anoConclusao)
    let dadosAlunos = listaDeAlunos.alunos
    let status = false

    let listaResultado = {
        curso: cursoSigla,
        anoDeConclusao: ano,
        alunos: []
    }

    dadosAlunos.forEach(function(aluno) {
        aluno.curso.forEach(function(cursoAluno) {
            if (String(cursoAluno.sigla).toUpperCase() === cursoSigla && Number(cursoAluno.conclusao) === ano) {
                listaResultado.alunos.push({
                    nome: aluno.nome,
                    matricula: aluno.matricula,
                    sexo: aluno.sexo,
                    foto: aluno.foto,
                    cursos: aluno.curso
                })
                status = true
            }
        })
    })

    if (status === true) {
        return listaResultado
    } else {
        return false
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

// console.log(getListaAlunosConclusao('rds', '2021'))
// console.log(getListaCursoStatus('rds', 'exame'))
// console.log(getAlunoStatus('finalizado'))
// console.log(getAlunoCurso('ds'))
// console.log(getAluno('20151001002'))
// console.log(getListaMatriculados())
// console.log(getListaDeCursos())