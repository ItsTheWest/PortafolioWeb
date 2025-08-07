import './Tecnologias.css'

interface TecnologiasProps {
  skills: { icon: string; name: string; bgColor: string }[];
}

function Tecnologias(props: TecnologiasProps) {
  return (
    <div className="stack-container">
      <div className="stack-grid">
        {props.skills.map((skill, index) => (
          <div className="stack-item" key={index}>
            <div
              className="icon-bg"
              style={{
                background: `${skill.bgColor}22`,
                boxShadow: `0 0 16px 0 ${skill.bgColor}`,
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                transition: 'box-shadow 0.3s'
              }}
            >
              <img
                src={skill.icon}
                alt={skill.name}
                className="stack-icon"
              />
            </div>
            <span className="stack-name">{skill.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Tecnologias;