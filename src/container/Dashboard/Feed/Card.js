import classes from './Card.module.css';
import image from '../../../assets/profile.jpg';
import { Link } from 'react-router-dom';

const Card = (props) => {
    // let date = new Date (props.date)
    const convertStampDate = (unixtimestamp)=>{

        var months_arr = ['January','February','March','April','May','June','July','August','September','October','November','December'];
        var date = new Date(unixtimestamp);
        const da = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]

        // Year
        var year = date.getFullYear();
        
        // Month
        var month = months_arr[date.getMonth()];
      
        var day = date.getDate();
        
        // Hours
        var hours = date.getHours();
 
        var minutes = "0" + date.getMinutes();
        
        var fulldate = da[date.getDay()]+', ' + month+' '+day+', '+hours + ':' + minutes.substr(-2);

        var convdataTime = month+' '+day;
        return fulldate;
        }
 
return(
    <div  className={classes.card}>
        <div className={classes.header}>
            <div className={classes.profile}><span><img src={props.profileImg} /></span></div>
            <div className={classes.details}>
                <Link to={`/${props.userid}`}>{props.name}</Link>
                <p className={classes.email}>{props.email}</p>
            </div>
            
        </div>
        <div onClick={(event)=>{props.click(event, props.post)}} className={classes.image}>
            <img src={props.img}/>
        </div>
        <div className={classes.caption}>
        {props.caption}
            <span className={classes.time}>{convertStampDate(props.date)}</span>
        </div>
    </div>
    );
}
// {`${day[date.getDay()]}, ${date.getTime()}`}

export default Card;