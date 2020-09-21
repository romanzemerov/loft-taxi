import React from 'react';
import { withHeader } from 'HOCs/withHeader';

export const Profile = () => {
  return <div>Профиль</div>;
};

export const ProfileWithHeader = withHeader(Profile);
