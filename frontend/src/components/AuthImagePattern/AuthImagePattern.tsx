import React from 'react';

type AuthImagePatternProps = {
  title: string;
  subtitle: string;
};
function AuthImagePattern({ title, subtitle }: AuthImagePatternProps) {
  return <div>{title + subtitle}</div>;
}

export default AuthImagePattern;
