
export let topview = (ref) => {
        ref.current.scrollIntoView({
            behaviour:'smooth',
            block:'start'
        })
    }