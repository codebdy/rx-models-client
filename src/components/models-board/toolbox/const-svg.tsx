
export const svgInherit = (color:string='#000')=> <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" >
<path d="
  M 10,16
  L 20,1
  L 30,16
  L 10,16
  M 20,16
  L 20,36
" stroke={color} strokeWidth="1" fill="#fff"></path>
</svg>

export const svgAssociation = <svg xmlns="http://www.w3.org/2000/svg" width="45" height="20" >
  <path d="
    M 0,10
    L 45,10
    L 38,3
    M 45,10
    L 38,17
  " stroke="#000" strokeWidth="1" fill="#fff"></path>
</svg>
export const svgAggregation = <svg xmlns="http://www.w3.org/2000/svg" width="45" height="20" >
  <path d="
    M 0,10
    L 8,5
    L 16,10
    L 8,15
    L 0,10
    M 16,10
    L 45,10
  " stroke="#000" strokeWidth="1" fill="#fff"></path>
</svg>
export const svgCombination = <svg xmlns="http://www.w3.org/2000/svg" width="45" height="20" >
  <path d="
    M 0,10
    L 8,5
    L 16,10
    L 8,15
    L 0,10
    M 16,10
    L 45,10
  " stroke="#000" strokeWidth="1" fill="#000"></path>
  <path d="
    M 16,10
    L 45,10
  " stroke="#000" strokeWidth="1" fill="#fff"></path>
  </svg>