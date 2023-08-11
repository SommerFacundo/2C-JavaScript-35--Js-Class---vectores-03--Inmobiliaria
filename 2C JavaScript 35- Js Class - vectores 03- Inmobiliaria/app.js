class Propiedades{
    constructor(nombreProp,tipoTransaccion,costoTrans,cantHabitacion,cantBanos,supTerreno,supCubierta){
        this.nombreProp = nombreProp;
        this.tipoTransaccion = tipoTransaccion;
        this.costoTrans = costoTrans;
        this.cantHabitacion = cantHabitacion;
        this.cantBanos = cantBanos;
        this.supTerreno = supTerreno;
        this.supCubierta = supCubierta;
    }
    get getPrecio(){return parseFloat(this.costoTrans)}
    get getSupCubierta(){return parseFloat(this.supCubierta)}
    get getCantBanos(){return parseInt(this.cantBanos)}
    get getNombre(){return this.nombreProp}
    get getTipoTransaccion(){return this.tipoTransaccion}
    get getCantHabitacion(){return this.cantHabitacion}
    get getSupTerreno(){return this.supTerreno}
}
function crearPropiedades(n,tpTran,cos,cantHab,cantBanos,supTerreno,supCubierta,opc){
    switch(opc){
        case "Casa":
            if(contCasas < 6){
                casas.push(new Propiedades(n,tpTran,cos,cantHab,cantBanos,supTerreno,supCubierta));
                contCasas++;
            }
        break;

        case "Departamento":
            if(contDepartamentos < 4){
                departamentos.push(new Propiedades(n,tpTran,cos,cantHab,cantBanos,supTerreno,supCubierta));
                contDepartamentos++;
            }
        break;

        case "Quintas":
            if(contQuintas < 3){
                quintasSSS.push(new Propiedades(n,tpTran,cos,cantHab,cantBanos,supTerreno,supCubierta));
                contQuintas++;
            }
        break;
    }


}
function calcPromedioCasas(casa){
    let cantTotal = 0;
    casa.map(n => cantTotal +=   n.getPrecio );
    return cantTotal / contCasas;
}

function casaConMayor(casas){
    let mayor = 0;
    let indice = 0;
    for (let i = 0; i < casas.length; i++) {
        if(casas[i].getSupCubierta > mayor){
            mayor = casas[i].getSupCubierta;
            indice = i
        }
    }
    return indice;
}
function casasConMasBanosySuperficie(casas){
    let arrayBanos = casas.filter(n => n.getCantBanos > 3 && n.getSupCubierta > 200);
    return arrayBanos;
}
let casas = [];
let quintas =[];
let departamentos = [];
let contCasas = 0;
let contQuintas = 0;
let contDepartamentos = 0;

document.getElementById("btnEnviar").addEventListener("click",()=>{
    event.preventDefault();
    let nombrePrp = document.getElementById("nombreProp").value;
    let tipoTransaccion = document.getElementById("tipoTrans").value;
    let costoTrans = document.getElementById("costo").value;
    let cantHabitacion = document.getElementById("cantHabitacion").value;
    let cantBanos = document.getElementById("cantBanos").value;
    let supTerreno = document.getElementById("supTerreno").value;
    let supCubierta = document.getElementById("supCubierta").value;
    let tipoProp = document.getElementById("tipoPropiedad").value;
    crearPropiedades(nombrePrp,tipoProp,costoTrans,cantHabitacion,cantBanos,supTerreno,supCubierta,tipoProp);
    console.log(casas)
    console.log(quintas)
    console.log(departamentos)


    console.log(tipoTransaccion)    
})

document.getElementById("btnMostrar").addEventListener("click",()=>{
    event.preventDefault();
    let contenedor = document.getElementById("resultados");
    let indiceCasaMayor = casaConMayor(casas);
    console.log(contenedor)
    contenedor.innerHTML += "Costo promedio de casas: " + calcPromedioCasas(casas);
    contenedor.innerHTML += "<br>Casa con mas metros cuadrados<br>" + "Nombre Titular: " + casas[indiceCasaMayor].getNombre + "<br>"
    + "Tipo transaccion: " + casas[indiceCasaMayor].getTipoTransaccion  + "<br>"+
     "Costo:" + casas[indiceCasaMayor].getPrecio + "<br>"+
    "Cantidad de habitacion: " + casas[indiceCasaMayor].getCantHabitacion + "<br>" + 
    "Cantidad de baños: " + casas[indiceCasaMayor].getCantBanos +
    "Superficie Terreno: " + casas[indiceCasaMayor].getSupTerreno + "<br>" +
    "Superficie cubierta: " + casas[indiceCasaMayor].getSupCubierta; 

});

document.getElementById("btnListar").addEventListener("click",()=>{
    event.preventDefault();
    let cont = document.getElementById("tablaCasa");
    let arr = casasConMasBanosySuperficie(casas)
    console.log(cont)
    while (cont.rows.length > 1) {
        cont.deleteRow(1);
      }
      for (const a of arr) {
        let tdNombreTitular = document.createElement("td");
        let tdTipoTrans = document.createElement("td");
        let tdCosto = document.createElement("td");
        let tdCantHabi = document.createElement("td");
        let tdBanos = document.createElement("td");
        let tdSuperficieTerreno = document.createElement("td");
        let tdSuperficieCubierta = document.createElement("td");

        let tr = document.createElement("tr");
        console.log(a)
        tdNombreTitular.innerHTML = a.getNombre;
        tdTipoTrans.innerHTML = a.getTipoTransaccion;
        tdCosto.innerHTML = a.getPrecio;
        tdCantHabi.innerHTML = a.getCantHabitacion;
        tdBanos.innerHTML = a.getCantBanos;
        tdSuperficieCubierta.innerHTML = a.getSupCubierta;
        tdSuperficieTerreno.innerHTML = a.getSupTerreno;
        tr.appendChild(tdNombreTitular);
        tr.appendChild(tdTipoTrans);
        tr.appendChild(tdCosto);
        tr.appendChild(tdCantHabi);
        tr.appendChild(tdBanos);
        console.log(tdSuperficieCubierta)
        tr.appendChild(tdSuperficieCubierta);
        tr.appendChild(tdSuperficieTerreno);
        console.log(tr)
        cont.appendChild(tr)
    }



});
