import { useEffect, useRef, useState, lazy } from 'react';
import { 
  Box, 
  Paper, 
  Typography, 
  Grid, 
  TextField, 
  Button, 
  Snackbar,
  Alert,
  Grow,
  Fab,
  Stack,
  Switch
} from '@mui/material';
import KeyboardDoubleArrowUpIcon from '@mui/icons-material/KeyboardDoubleArrowUp';
import Carousel from 'react-material-ui-carousel';
import emailjs from '@emailjs/browser';
import './App.css';
import dungeon from './static/dungeon.gif';
import cars from './static/cars.gif'
import venus from './static/venus.gif';
import cvEng from './static/CV-ENG.pdf';
import cvEsp from './static/CV-ESP.pdf';
import Lottie from 'react-lottie';
import linkedIn from './json/linkedIn.json';
import whatsapp from './json/whatsapp.json';
import github from './json/github.json';
import { LazyLoadImage } from "react-lazy-load-image-component";

export const Project = (props) => {
  return ( 
    <Grid container 
    spacing={3} 
    display={'flex'} 
    alignItems={'center'}
    justifyContent={'center'}
    pt={{xs:'auto',md:2}}
    pb={1}
    >
      <Grid item xs={12} md={4}>
        <Grid item>
          <Typography pb={1} sx={{ 
            fontSize: {
              xs:'1.5rem',
              sm:'2.5rem',
              md: '2rem'
            },
            textDecoration:'underline',
            textAlign: {
              xs:'center',
              md: 'left'
            },
            pt:{
              xs:0,
              md:7
            }
          }}>{props.title}</Typography>
          <Typography
          sx={{ 
            fontSize:{
              md:'1.2rem',
              sm:'1.5rem',
              xs:'1rem'
            },
            textAlign: {
              xs:'center',
              md: 'left'
            }
          }}
          >{props.description}</Typography>
        </Grid>
      </Grid>
      <Grid xs={12} md={8} item>
        <Box height={{xs:'120px',sm:'270px',md:'300px'}}>
          <LazyLoadImage style={{ width:'100%', height:'100%', objectFit: 'contain'}} src={props.src} loading='lazy'/>
        </Box>
      </Grid>
    </Grid>
);
}

export const Job = (props) => {
  return ( 
    <Grid xs={12} display={'flex'} justifyContent={'center'}>
        <Grid xs={12} md={8} display={'flex'} flexDirection={'column'} justifyContent={'center'} alignItems={'center'}>
          <Typography fontSize={{xs:'7vw',md:'7vmin'}} style={{textDecoration:'underline'}}>{props.company}</Typography>
          <Typography fontSize={{xs:'5vw',md:'2rem'}} textAlign={'center'}>{props.title}</Typography>
          <Typography fontSize={{xs:'3.5vw',md:'1.5rem'}} p={{xs:'10px 30px',sm:'10px 70px', md:'0'}} textAlign={'center'}>{props.description}</Typography>
        </Grid>
    </Grid>);
}

export const Tec = (props) => {
  return ( 
    <Grid container xs={12} display={'flex'} justifyContent={'center'} alignItems={'center'}>
      <Grid item xs={6} sm={8} md ={6} display={'flex'} justifyContent={'center'} alignItems={'center'}>
        <Box height={{xs:'200px',sm:'300px',md:'350px'}} >
          <img src={props.src} width={'100%'} height={'100%'} style={{objectFit:'contain'}}/>
        </Box>
      </Grid>
    </Grid>);
}

export const MessageSnackbar = (props) => {

  const getSuccessMessage = () =>{
    return !props.eng ? 'Mensaje enviado': 'Message Sent';
  }

  const getErrorMessage = () =>{
    return !props.eng ? 'Error: mensaje no enviado': 'Error: message not sent';
  }

  return(<Snackbar
    autoHideDuration={5000}
    sx={{width:{
      md:'40%',
      xs: '90%'
    }}}
    anchorOrigin={{ vertical:'top', horizontal:'left'}}
    open={props.confirmSnackbar}
    TransitionComponent={Grow}
    transitionDuration={500}
    onClose={props.onClose}
    TransitionProps={{'orientation':'horizontal'}}
    >
      <Alert
        severity={props.success ? 'success':'error'}
        variant='filled'
        sx={{ fontSize: '4vmin', display:'flex',alignItems:'center', padding:'0 6vmin'}}>
            {props.success ? getSuccessMessage():getErrorMessage()}
      </Alert>
    </Snackbar>);
}

export const Contact = (props) => {
  const form = useRef();

  const sendEmail = (e) => {
    e.preventDefault();
    emailjs.sendForm('service_959oqgw', 'template_09l49hr', form.current, {
        publicKey: 'lMAVJ3xHd3JksWP8M'
      }).then(()=> {props.handleConfirm(true); form.current.reset();})
      .catch(() => props.handleConfirm(false));
  };

  return (
    <form ref={form} onSubmit={sendEmail} autoComplete='off'>
      <Grid xs={12} sx={{pt:{md:'3vmin',xs:'3vmin'}}}>
        <Grid xs={12} md={6} display={'flex'} flexDirection={'column'}>

          <TextField required sx={{mt:0.5, mb:0.5}}
          InputProps={{style:{borderRadius:0, color:'white'}}}
          InputLabelProps={{style:{color:'white'}}}
          label={!props.eng?'Nombre':'Name'} variant='outlined' name='name'/>

          <TextField required sx={{mt:0.5, mb:0.5}}
          InputProps={{style:{borderRadius:0, color:'white'}}}
          InputLabelProps={{style:{color:'white'}}}
           label={!props.eng?'Correo':'Email'} variant='outlined' name='from_email'/>

        </Grid>
        <Grid xs={12} display={'flex'} alignItems={'center'} flexDirection={'column'}>

          <TextField required sx={{m:0.5}} InputProps={{style:{color:'white', borderColor:'#07603A', borderRadius:0}}} 
          fullWidth label={!props.eng?'Mensaje':'Message'} variant='outlined' 
          InputLabelProps={{style:{color:'white'}}}
          multiline name='message' rows={3}/>

          <Button type='submit' size='large' variant='outlined' sx={{m:0.5, color: 'white',borderRadius:0}}>{!props.eng ? 'Enviar':'Send'}</Button>
        </Grid>
      </Grid>
    </form>
  );
};

const App = () => {
  const [confirmSnackbar, setConfirmSnackbar] = useState(false)
  const [success, setSuccess] = useState(false);
  const [eng, setEng] = useState(false);
  const [scrollButton, setScrollButton] = useState(false);

  const handleMessageResponse = (success) => {
    setConfirmSnackbar(true);
    setSuccess(success);
  } 

  const toggleVisible = () => { 
    const scrolled = document.documentElement.scrollTop; 
    if (scrolled > 300){ 
      setScrollButton(true) 
    }  
    else if (scrolled <= 300){ 
      setScrollButton(false) 
    } 
  };

  const scrollToTop = () =>{ 
    window.scrollTo({ 
      top: 0,  
      behavior: 'smooth'
    }); 
  }; 

  useEffect(()=>{
    window.addEventListener('scroll', toggleVisible); 
    document.getAnimations().forEach(animation => {
      animation.cancel();
      animation.play();
    });
  },[eng]);

  const defaultOptions = {
    loop: true,
    autoplay: true,
  };

  return (
    <>
      <div className='page'>
        <div className='background-container'>
          <span className='line line-right' style={{marginRight:'100vw', marginTop: '60vh'}}/>
          <span className='line line-left' style={{marginLeft: '120vw',marginBottom: '60vh'}}/>
          <span className='line line-left' style={{marginRight: '120vw',marginBottom: '20vh'}}/>
        </div>
        <Box className='box-container'>
          <Box display={'flex'} justifyContent={'flex-end'} alignItems={'flex-end'} pt={'5vmin'} pr={'13vmin'}>
            <Paper square className='paper paper-right' elevation={24}>
              <Grid container xs={12} display={'flex'} justifyContent={'center'}
              sx={{
                alignItems:{
                  xs:'center',
                },
                flexDirection:{
                  xs: 'column-reverse',
                  md: 'row'
                },
                p:'5vmin 0'
              }}>
                  <Grid xs={12} sx={{position:{md:'fixed',sm:'block'},bottom:0, left:0, m:{xs:2,sm:1,md:3}}}>
                    <Button href={!eng?cvEsp:cvEng} download={'SebastianQuirosCV.pdf'} variant='contained' sx={{color:'black',fontWeight:'bold',borderRadius:0}}>
                      {!eng? 'Descargar CV':'Download Resume'}
                      </Button>
                 </Grid>
                  <Grid item sm={12} md={8}
                  display={'flex'} 
                  alignItems={'center'} 
                  justifyContent={'center'} 
                  alignSelf={'center'} 
                  flexDirection={'column'}
                  spacing={'3.5vmin'}
                  sx={{
                    mb:{
                      xs:'3vmin',
                      md:'8vmin'
                    }
                  }}
                >
                    <Grid item display={'flex'} xs={12} alignSelf={'center'}>
                      <Typography
                          sx={{
                            fontSize:{
                              xs:'9vmin',
                              md:'6vw'
                            }
                          }}
                          >Sebastián Quirós Vargas
                      </Typography>
                    </Grid>
                    <Grid item display={'flex'} sm={12} 
                    sx={{
                      width:{
                        xs: 'auto',
                        md: '80%'
                      }
                    }} flexDirection={'column'} alignSelf={'flex-end'}>
                        <Typography 
                              fontSize={'3.5vmin'}
                              sx={{
                                alignSelf:{
                                  xs:'center',
                                  md:'flex-start'
                                }
                              }}
                              >{!eng ? `Ingeniero de software con experiencia en diseño, arquitectura`:`Software Engineer with experience in design, architecture`} 
                            </Typography>
                            <Typography 
                              fontSize={'3.5vmin'}
                              sx={{
                                alignSelf:{
                                  xs:'center',
                                  md:'flex-end'
                                }
                              }}
                              >{!eng ? `y desarrollo de soluciones completas para web y escritorio`: `and development of whole applications for web and desktop`}
                          </Typography>
                    </Grid>
                  </Grid>
                  <Grid item xs={12} md={4} display={'flex'} justifyContent={'center'}>
                    <Box sx={{width:{xs:'30%',md:'65%'}}}>
                      <img src={'https://res.cloudinary.com/proyectoiteracion/image/upload/v1713028451/portafolio-sqv/logo_jdrsth.png'} width={'100%'}/>
                    </Box>
                </Grid>
                </Grid>
            </Paper>
          </Box>
          <Box display={'flex'} justifyContent={'flex-start'} alignItems={'flex-end'} pt={'5vmin'} pl={'13vmin'}>
            <Paper square className='paper paper-left' elevation={24}>
                <Grid container xs={12} alignSelf={'center'}>
                  <Grid item xs={12} display={'flex'} justifyContent={{xs:'center',md:'flex-start'}}>
                    <Typography sx={{
                              fontSize:{
                                xs:'10vw',
                                md:'6vw'
                              },
                              position:{
                                sm:'block',
                                md:'fixed'
                              },
                              p:{
                                xs: '30px 0 5px 0',
                                md: '30px 60px 0 60px'
                              }
                    }}>{!eng ? 'Proyectos': 'Projects'}</Typography>
                  </Grid>
                  <Grid xs={12} display={'flex'} justifyContent={'center'} sx={{padding: {xs:'0' ,sm:'0 20px',md:'0 60px'}}}>
                    <Carousel 
                      interval={10000} 
                      navButtonsAlwaysVisible
                      sx={{width:'100%', padding: {xs:'0 30px', sm:'0 80px', md:'40px 80px 0 80px'} }}
                      indicatorContainerProps={{
                        style: {display: 'none'}
                      }}
                      navButtonsProps={{
                        style:{backgroundColor:'#07603A', color:'black', width:'5vmin', height:'5vmin'}
                      }}
                    >
                      <Project src={cars} description={!eng ? 'Sistema de gestión de vehículos para una agencia. Implementado con React, Spring Boot y Azure Cosmos. Desplegado con Azure DevOps.':'Car management system for an agency. Implemented with React, Spring Boot and Azure Cosmos as a NoSQL DB. Deployed through Azure DevOps.'} title={'DevOps Cars'}/>
                      <Project src={dungeon} description={!eng ? 'Juego sobre armar y resolver calabozos. Implementado con Java utilizando LibGDX como framework.': 'Dungeon building and solving game. Implemented with Java using LibGDX as framework.'} title={'Dungeon Master'}/>
                      <Project src={venus} description={!eng ? 'Aplicación de monitoreo del ciclo femenino. Implementado con Angular, Spring Boot, NodeJS y MySQL. Desplegado con Azure DevOps.':'App to monitor the feminine cycle. Implemented with Angular, Spring Boot, NodeJS and MySQL. Deployed through Azure DevOps.'} title={'Venus'}/>
                    </Carousel>
                  </Grid>
                </Grid>
            </Paper>
          </Box>
          <Box display={'flex'} justifyContent={'flex-end'} alignItems={'flex-end'} pt={'5vmin'} pr={'13vmin'}>
            <Paper square className='paper paper-right' elevation={24}>
              <Grid container xs={12} sx={{p:{xs:'30px 20px',md:3}}}>
                <Grid item spacing={2} xs={12} md={4} display={'flex'} justifyContent={'center'} alignItems={'center'}>
                  <Typography
                    sx={{
                      fontSize:{
                      md: '6vw',
                      xs: '10vw'
                    }, 
                    pb:{xs:'auto', md:'14vmin'}}}
                    >{!eng?'Experiencia':'Experience'}
                  </Typography>
                </Grid>
                <Grid item xs={12} md={8} sx={{
                  p:{
                    sm:'10px 5px 20px 5px',
                    xs:'10px 5px 10px 5px',
                    md:0
                  },
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent:'center',
                  height:{
                    xs:'auto',
                    md:'300px'

                  }
                }}>
                  <Carousel 
                      navButtonsAlwaysVisible
                      indicatorContainerProps={{
                        style: {display: 'none'}
                      }}
                      sx={{width:{xs:'100%',md:'80%'}}}
                      navButtonsProps={{
                        style:{backgroundColor:'#07603A', color:'black', width:'5vmin', height:'5vmin'}
                      }}
                    >
                      <Job title={!eng ? 'Desarrollador de Software': 'Software Developer'} company={'Roc Capital'} description={!eng?'Desarrollo y mantenimiento de los portales externos y herramientas internas de la compañía':'Development and meinteinance of the external portals and internal tools of the company'}/>
                      <Job title={!eng ? 'Desarrollador Full-Stack':'Full-Stack Developer'} company={'First Factory'} description={!eng?'Desarrollo de soluciones con código escalable y de alto rendimiento para aplicaciones empresariales.':'Development of solutions with scalable, high performing code for enterprise applications'}/>
                      <Job title={!eng? 'Ingeniero de Soporte':'Azure DevOps Support Engineer III'} company={'Tek Experts'} description={!eng?'Dar soporte a los usuarios de la plataforma Azure DevOps. Dar mentorías a los juniors.':'Offer support to the users of the Azure DevOps platform. Mentor juniors'}/>
                    </Carousel>
                </Grid>
              </Grid>
            </Paper>
          </Box>
          <Box display={'flex'} justifyContent={'flex-start'} alignItems={'flex-end'} pt={'5vmin'} pl={'13vmin'}>
            <Paper square className='paper paper-left' elevation={24}>
              <Grid container xs={12} p={{xs: '10px',sm:'30px 10vmin',md:'3vmin 10vmin'}} display={'flex'} justifyContent={'center'} alignItems={'center'}>
                <Grid item xs={12} md={6} display={'flex'} sx={{justifyContent:{xs:'center',md:'flex-start'}}} alignItems={'center'}>
                  <Typography
                    sx={{
                      fontSize:{
                        md: '6vw',
                        xs: '12vmin'
                      },
                      p:{
                        xs: '20px 0 0 0',
                        sm: '20px 0 10px 0',
                        md: '0 0 14vmin 0'
                      }
                    }}
                    >{!eng? 'Tecnologías': 'Technologies'}
                  </Typography>
                </Grid>
                <Grid item xs={10} md={6} pb={{xs:0,sm:'20px',md:0}}>
                  <Carousel 
                    interval={3000} 
                    navButtonsAlwaysVisible
                    indicatorContainerProps={{
                      style: {display: 'none'}
                    }}
                    navButtonsProps={{
                      style:{backgroundColor:'#07603A', color:'black', width:'5vmin', height:'5vmin'}
                    }}>
                      <Tec src={'https://res.cloudinary.com/proyectoiteracion/image/upload/v1713028461/portafolio-sqv/spring_ofioq4.png'}/>
                      <Tec src={'https://res.cloudinary.com/proyectoiteracion/image/upload/v1713028459/portafolio-sqv/react_utzj1z.png'}/>
                      <Tec src={'https://res.cloudinary.com/proyectoiteracion/image/upload/v1713028456/portafolio-sqv/node_eptnci.png'}/>
                      <Tec src={'https://res.cloudinary.com/proyectoiteracion/image/upload/v1713028464/portafolio-sqv/sql_yfjlsm.png'}/>
                      <Tec src={'https://res.cloudinary.com/proyectoiteracion/image/upload/v1713028476/portafolio-sqv/ado_dkljzf.png'}/>
                      <Tec src={'https://res.cloudinary.com/proyectoiteracion/image/upload/v1713028470/portafolio-sqv/vanilla_vqnwx9.jpg'}/>
                      <Tec src={'https://res.cloudinary.com/proyectoiteracion/image/upload/v1713028478/portafolio-sqv/angular_qjvadv.png'}/>
                      <Tec src={'https://res.cloudinary.com/proyectoiteracion/image/upload/v1713028473/portafolio-sqv/.net_s6hytc.png'}/>
                      <Tec src={'https://res.cloudinary.com/proyectoiteracion/image/upload/v1713028453/portafolio-sqv/mongo_h1smbj.png'}/>
                      <Tec src={'https://res.cloudinary.com/proyectoiteracion/image/upload/v1713028448/portafolio-sqv/lbgdx_xkdpvg.png'}/>
                  </Carousel>
                </Grid>
              </Grid>
            </Paper>
          </Box>
          <Box display={'flex'} justifyContent={'flex-end'} alignItems={'flex-end'} pt={'5vmin'} pr={'13vmin'}>
            <Paper square className='paper paper-right' elevation={24}>
              <Grid container xs={12} sx={{p:{xs:'6vmin 7vmin',md:3}}} height={'100%'}>
                <Grid item xs={12} md={4} display={'flex'} alignItems={'center'} sx={{justifyContent:{xs:'center'}}}>
                  <Typography
                    sx={{
                      fontSize:{
                        md: '6vw',
                        xs: '12vmin'
                      },
                      pb:{
                        xs:'auto',
                        md:'14vmin',
                        sm: '20px'
                      }
                    }}
                    >{!eng ? 'Contacto':'Contact'}
                  </Typography>
                </Grid>
                <Grid item xs={12} md={8} >
                  <Contact eng={eng} handleConfirm = {handleMessageResponse}/>
                </Grid>
              </Grid>
            </Paper>
          </Box>
          <Stack direction='row' alignItems='center' sx={{position:'fixed',top:0,left:0, margin:3}}>
            <img src={'https://res.cloudinary.com/proyectoiteracion/image/upload/v1713028467/portafolio-sqv/united-states_vwnvtp.png'}/>
            <Switch checked={eng} onChange={()=>{setEng(!eng)}} color='secondary'/>
          </Stack>
          <Box position={'fixed'} bottom={0} right={0} m={3} display={'flex'} flexDirection={'column'} alignItems={'center'}>
            <Fab color='primary' size='small'  href={'https://wa.me/50683628853'} target={'_blank'} sx={{color:'black', width:{xs:'36px'}, height:{xs:'36px', m:'5px 0'}}}><Lottie height={30} width={30} options={{...defaultOptions, animationData: whatsapp}}/></Fab>
            <Fab color='primary' size='small' href={'https://linkedin.com/in/squiros-dev'} target={'_blank'} sx={{color:'black', width:{xs:'36px'}, height:{xs:'36px'}, m:'5px 0'}}><Lottie height={30} width={30} options={{...defaultOptions, animationData: linkedIn}}/></Fab>
            <Fab color='primary' size='small'  href={'https://github.com/squirosv96'} target={'_blank'} sx={{color:'black', width:{xs:'36px'}, height:{xs:'36px', m:'5px 0'}}}><Lottie height={25} width={25} options={{...defaultOptions, animationData: github}}/></Fab>
            {scrollButton && <Fab color='primary' size='small' onClick={scrollToTop}  sx={{color:'black', width:{xs:'46px',md:'56px'}, height:{xs:'46px',md:'56px'}, m:'5px 0'}}><KeyboardDoubleArrowUpIcon/></Fab>}
          </Box>
        </Box>
      </div>
      <MessageSnackbar eng={eng} onClose={()=>{setConfirmSnackbar(false)}} confirmSnackbar={confirmSnackbar} success={success}/>
  </>
  );
}

export default App;
