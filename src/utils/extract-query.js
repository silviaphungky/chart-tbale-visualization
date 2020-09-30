const ExtractQuery = {
  getPage: (url) => {
    let number = null
    if(url) {
      const pageQuery = url.split('?').pop()
      number = Number(pageQuery.split('=').pop())
    }
    return number
  }
}

export default ExtractQuery
