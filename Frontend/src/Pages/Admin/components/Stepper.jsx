import * as React from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useNavigate } from 'react-router-dom';

const steps = ['QR코드를 스캔해주세요.', '꽁초를 넣어주세요.', '꽁초를 판별합니다.'];

export default function HorizontalLinearStepper() {
  const navigate = useNavigate()
  const [activeStep, setActiveStep] = React.useState(0);
  const [skipped, setSkipped] = React.useState(new Set());

  const isStepSkipped = (step) => {
    return skipped.has(step);
  };

  const handleNext = () => {
    let newSkipped = skipped;
    if (isStepSkipped(activeStep)) {
      newSkipped = new Set(newSkipped.values());
      newSkipped.delete(activeStep);
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped(newSkipped);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Stepper activeStep={activeStep}>
        {steps.map((label, index) => {
          const stepProps = {};
          const labelProps = {};
          if (isStepSkipped(index)) {
            stepProps.completed = false;
          }
          return (
            <Step key={label} {...stepProps}>
              <StepLabel {...labelProps}>{label}</StepLabel>
            </Step>
          );
        })}
      </Stepper>
      {activeStep === steps.length ? (
        <React.Fragment>
          <Typography sx={{ mt: 2, mb: 1 }}>
            All steps completed - you&apos;re finished
          </Typography>
          <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
            <Box sx={{ flex: '1 1 auto' }} />
            <Button onClick={handleReset}>Reset</Button>
          </Box>
        </React.Fragment>
      ) : (
        <React.Fragment>
          <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', pt: 2 }}>
            <Button
              color="inherit"
              disabled={activeStep === 0}
              onClick={handleBack}
              sx={{ mr: 1 }}
            >
              뒤로
            </Button>

            {activeStep === steps.length - 1 ? 
            <Button onClick={() => {localStorage.getItem('access-token') !== 'undefined' &&
              localStorage.getItem('access-token') !== null ? navigate('/qr') : navigate('/login')}}>
              지금 이용하러 가기
            </Button>
            : 
            <Button onClick={handleNext}>
              다음
            </Button>
            }
          </Box>
          <Box>
            {activeStep === 0 ? <img src='https://i.postimg.cc/NFhngGj2/1.png'style={{width: "100%"}}/> : null}
            {activeStep === 1 ? <img src='https://i.postimg.cc/j56H7Rh7/2.png'style={{width: "100%"}}/> : null}
            {activeStep === 2 ? <img src='https://i.postimg.cc/x80KGBsF/3.png'style={{width: "100%"}}/> : null}
          </Box> 
        </React.Fragment>
      )}
    </Box>
  );
}
