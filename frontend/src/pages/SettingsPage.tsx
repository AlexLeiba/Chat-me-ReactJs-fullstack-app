import { Col, Container, Row } from '../components/UI/Grid';
import useGlobalTeamStore from '../store/useThemeStore';
import React from 'react';
import { THEMES_LIST } from '../consts/index';
import { Spacer } from '../components/UI/spacer/spacer';
import ReviewChatThemeSection from '../components/PreviewChatThemeSection/ReviewChatThemeSection';

function SettingsPage() {
  const { globalTheme, setGlobalTheme } = useGlobalTeamStore();
  return (
    <Container>
      <Row>
        <Col className='' sm={2} md={4}>
          <div className='flex flex-col gap-1'>
            <h1 className='text-lg text-secondary font-bold '>Theme</h1>
            <p className='text-sm text-base-content/70'>Choose your theme</p>
          </div>
        </Col>
      </Row>
      <Spacer size={8} />
      <Row>
        <Col lg={6} sm={4} md={4}>
          <Row>
            {THEMES_LIST.map((themeListed, index) => (
              <Col lg={4} md={2} sm={2} key={index}>
                <button
                  onClick={() => setGlobalTheme(themeListed)}
                  className={`${
                    globalTheme === themeListed
                      ? 'bg-base-content/50'
                      : 'bg-base-content/5'
                  } rounded-full w-full h-12 p-2 flex justify-center items-center  text-sm font-medium transition-colors duration-200 hover:bg-base-content/10`}
                >
                  <div
                    className=' relative h-8 w-full rounded-full overflow-hidden'
                    data-theme={themeListed}
                  >
                    <div className='absolute    inset-0 w-28 grid grid-cols-4 gap-px p-1'>
                      <div className='rounded-full bg-primary relative left-0 top-0  border-bg-base-content/10 border' />
                      <div className='rounded-full bg-secondary relative left-[-12px] top-0  border-bg-base-content/10 border' />
                      <div className='rounded-full bg-accent relative left-[-24px] top-0  border-bg-base-content/10 border' />
                      <div className='rounded-full bg-neutral relative left-[-36px] top-0  border-bg-base-content/10 border' />
                    </div>
                  </div>
                  <span className='text-base-content/100 font-medium truncate w-full text-center'>
                    {themeListed.charAt(0).toUpperCase() + themeListed.slice(1)}
                  </span>
                </button>
              </Col>
            ))}
          </Row>
        </Col>
        <Col lg={6} sm={4} md={4}>
          <ReviewChatThemeSection />
        </Col>
      </Row>
    </Container>
  );
}

export default SettingsPage;
