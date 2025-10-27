let banco= []

class Horario{
    constructor(data,fim){
        this.data=data
        this.fim=fim
        banco.push(this)
    }
}

function adicionar(){
    let horacomeco = document.querySelector(".comeco")
    let horafim = document.querySelector(".fim")
    let comeco=new Date(dia_selecionado.getFullYear(),dia_selecionado.getMount(),dia_selecionado.getDay(),horacomeco)
    let fim=new Date(dia_selecionado.getFullYear(),dia_selecionado.getMount(),dia_selecionado.getDay(),horafim)
    let novo_data= new Horario(comeco,fim)
}
