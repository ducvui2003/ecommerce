import HeaderWrapper from '@/components/HeaderWrapper';
import React from 'react';
import ContactForm from '@/app/contact-us/ContactForm';

function Page() {
  return (
    <HeaderWrapper footer>
      <ContactForm />
    </HeaderWrapper>
  );
}

export default Page;
