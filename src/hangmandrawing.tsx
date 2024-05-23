const BASE = (
    <div style={{ height: "4px", width: "250px", background: "#0A3871", position:'absolute', top: 362}} />
)

const HASTE = (  
    <div
        style={{
        height: "50px",
        width: "5px",
        background: "#0A3871",
        position: "absolute",
        top: 0,
        right: 0,
        }}
    />
)

const HASTEDIREITA =(
    <div
          style={{
            height: "5px",
            position: 'absolute',
            top: 0,
            width: "200px",
            background: "#0A3871",
            marginLeft: "50px",
          }}
        />
)

const HASTEBAIXO = (
    <div className="hastebaixo"
          style={{
            height: "360px",
            width: "5px",
            background: "#0A3871",
            marginLeft: "50px",
          }}
        />
)
const HEAD = (
    <div
      style={{
        width: "50px",
        height: "50px",
        borderRadius: "100%",
        border: "5px solid #0A3871",
        position: "absolute",
        top: "50px",
        right: "-30px",
      }}
    />
)
  
const BODY = (
    <div
      style={{
        width: "5px",
        height: "100px",
        background: "#0A3871",
        position: "absolute",
        top: "110px",
        right: 0,
      }}
    />
)
  
const RIGHT_ARM = (
    <div
      style={{
        width: "100px",
        height: "5px",
        background: "#0A3871",
        position: "absolute",
        top: "107px",
        right: "-98px",
        rotate: "-310deg",
        transformOrigin: "left bottom",
      }}
    />
)
  
const LEFT_ARM = (
    <div
      style={{
        width: "100px",
        height: "5px",
        background: "#0A3871",
        position: "absolute",
        top: "107px",
        right: "3px",
        rotate: "310deg",
        transformOrigin: "right bottom",
      }}
    />
)
  
const RIGHT_LEG = (
    <div
      style={{
        width: "100px",
        height: "5px",
        background: "#0A3871",
        position: "absolute",
        top: "205px",
        right: "-95px",
        rotate: "60deg",
        transformOrigin: "left bottom",
      }}
    />
)
  
const LEFT_LEG = (
    <div
      style={{
        width: "100px",
        height: "5px",
        background: "#0A3871",
        position: "absolute",
        top: "205px",
        right: '0px',
        rotate: "-60deg",
        transformOrigin: "right bottom",
      }}
    />
)
  
const BODY_PARTS = [BASE, HASTEBAIXO, HASTEDIREITA, HASTE, HEAD, BODY, RIGHT_ARM, LEFT_ARM, RIGHT_LEG, LEFT_LEG]
  
type HangmanDrawingProps = {
    numberOfGuesses: number
}
  
export function HangmanDrawing({ numberOfGuesses }: HangmanDrawingProps) {
    return (
        <div className="boneco" style={{ position: 'relative', height: '400px', width: '250px', marginLeft: '100px' }}>
            {BODY_PARTS.slice(0, numberOfGuesses)}
        
      </div>
    )
}