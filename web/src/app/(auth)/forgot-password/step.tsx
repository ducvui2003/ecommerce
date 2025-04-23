'use client';
import ForgotPasswordForm from '@/app/(auth)/forgot-password/forgot-password-form';
import ResetPasswordForm from '@/app/(auth)/forgot-password/reset-password-form';
import VerificationForm from '@/app/(auth)/forgot-password/verification-form';
import React, { useState } from 'react';

type StepData = {
  step1: {
    email: string;
  };
  step2: {
    otp: string;
  };
  step3: {
    password: string;
  };
};

type StepType = 'step1' | 'step2' | 'step3';

const Step = () => {
  const [currentStep, setCurrentStep] = useState<StepType>('step1');
  const [data, setData] = useState<StepData>({
    step1: {
      email: '',
    },
    step2: {
      otp: '',
    },
    step3: {
      password: '',
    },
  });

  const updateData = (step: StepType, data: any) => {
    setData((prev) => ({ ...prev, [step]: data }));
  };

  const render = () => {
    switch (currentStep) {
      case 'step1':
        return (
          <ForgotPasswordForm
            onUpdate={(data) => updateData('step1', data)}
            onNextStep={() => setCurrentStep('step2')}
          />
        );
      case 'step2':
        return (
          <VerificationForm
            data={data.step1}
            onUpdate={(data) => updateData('step2', data)}
            onNextStep={() => {
              setCurrentStep('step3');
            }}
          />
        );
      case 'step3':
        return (
          <ResetPasswordForm
            data={{
              email: data.step1.email,
              otp: data.step2.otp,
            }}
          />
        );
    }
  };
  return render();
};

export default Step;
