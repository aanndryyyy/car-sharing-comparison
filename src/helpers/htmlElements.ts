const userDot = (): HTMLElement => {
  const elem = document.createElement('div')
  elem.style.background = 'royalblue'
  elem.style.borderRadius = '20px'
  elem.style.boxShadow = '0px 0px 0px 8px rgba(0, 0, 252, 0.2)'
  elem.style.border = '1px solid white'
  elem.style.padding = '2px'
  elem.style.width = '16px'
  elem.style.height = '16px'
  return elem
}

export default userDot
