'use client'

import { Container } from '@/ui/components/container/container';
import {ContactForm} from '../../../components/contactForm';
import { P } from '@/styles/globalStyle';

const ContactPage = () => {
    return (
        <div className='pt-10 lg:pt-16 mx-5 lg:mx-80 flex flex-col gap-10 lg:h-screen'>
            <Container className='flex flex-col justify-center items-center gap-2 lg:text-center'>
                <P className='text-2xl'>Envoyez Un Message!</P>
                <span className='text-xl'>Vous avez une question ou une proposition, ou vous souhaitez simplement
                dire bonjour ? Allez-y.
                </span>
            </Container>

            <ContactForm />
        </div>
    );
};

export default ContactPage;
