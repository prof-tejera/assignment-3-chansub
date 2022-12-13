import "./Button.css";
import playIcon from '../../images/icons8-play-96.png';
import pauseIcon from '../../images/icons8-pause-96.png';
import resetIcon from '../../images/icons8-replay-96.png';
import stopIcon from '../../images/icons8-stop-96.png';
import removeIcon from '../../images/icons8-remove-96.png';
import editIcon from '../../images/icons8-edit-24.png';
import closeIcon from '../../images/icons8-close-window-50.png';

//Note: icons downloaded from https://icons8.com
const imgSources = [  
  {type: 'play', src: playIcon},
  {type: 'pause', src: pauseIcon},
  {type: 'reset', src: resetIcon},
  {type: 'stop', src: stopIcon},
  {type: 'remove', src: removeIcon, width: '20px'},
  {type: 'edit', src: editIcon, width: '20px'},
  {type: 'close', src: closeIcon, width: '20px'}
]

const Button = ({ type, text, ...btnProps }) => {

  function renderButton(buttonType,buttonText){
    let item = imgSources.find(item => item.type === buttonType);
    if(item){
      return <img src={item.src} width={item.width ? item.width : '30px'} alt={buttonText} title={buttonText}/>
    }
    else{
      return buttonText;
    }
  }

  return (
    <button
      {...btnProps}
    >
      {renderButton(type,text)}
    </button>
  );
};


export default Button;
