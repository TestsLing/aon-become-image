
interface Template {
    id: string
    image: string
    prompt: string
}

// 获取模板
export async function getTemplate() {
    const imgOrigin = window.location.origin
    const response = await fetch('/templates/template.json');
    const resList = await response.json();
    if(resList && resList.length > 0){
        resList.forEach((item: Template) => {
            item.image = `${imgOrigin}/templates/images/${item.image}`
        })

    }
    return resList
}