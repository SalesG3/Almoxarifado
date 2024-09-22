export interface InterfaceProduto {
    id:string
    codigo:string
    nome:string
    medida:string
    marca:string
    categoria:string
    localizacao:string
    centro_custo:string
    almoxarifado:string
    descricao:string
}

export interface interfaceCategory {
    id : string
    codigo : string
    nome : string
    ativo : boolean
    descricao : string
}
