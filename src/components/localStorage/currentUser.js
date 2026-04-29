export let getlocaldata = () => {
    let g = localStorage.getItem('User')
    return JSON.parse(g)
}
export let getlocaldata2 = () => {
    let g = localStorage.getItem('Admin')
    return JSON.parse(g)
}
export let setlocaldata = (name, value) => {
    localStorage.setItem(name, JSON.stringify(value))

}

export let getkey = () => {
    let g = localStorage.getItem('token')
    return JSON.parse(g)
}

export let weather=(name,value)=>{
    localStorage.setItem(name,JSON.stringify(value))
}

export let getWeather = () => {
    let g = localStorage.getItem('weather')
    return JSON.parse(g)
}