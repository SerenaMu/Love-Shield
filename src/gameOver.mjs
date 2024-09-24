class gameover extends plane{
  constructor(options) {
      super({
          ...options,
          dom: document.createElement('div')
      })
      this.dom.className = 'gameover'
      let title = document.createElement('div')
      title.className = 'title'
      title.innerText = 'GAME OVER'
      this.dom.appendChild(title)
      let scoreDom = document.createElement('div')
      scoreDom.className = 'score'
      scoreDom.innerText =  score
      this.dom.appendChild(scoreDom)
      let time = document.createElement('div')
      time.className = 'time'
      time.innerText = score > 200 ? 'Amazing move' : score > 120 ? 'Well done' : score > 50 ? 'Pretty good' : 'Keep trying'
      this.dom.appendChild(time)
      let btn = document.createElement('button')
      btn.className = 'resetGame'
      btn.innerText = 'resetGame'
      btn.onclick = () => {
          location.reload()
      }
      this.dom.appendChild(btn)
      document.body.appendChild(this.dom)
  }
}