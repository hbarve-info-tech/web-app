
import React from 'react';

import Card from './Card';

import style from './style';

const CardList = [
  {
    title: 'Introduction',
    description: `Mayash is a team of IITians committed to solve the challenges of the society. As there are so 
    many challenges are out there, quality in education is one of the core problem.`,
    url: '/introduction',
    imageUrl: 'https://storage.googleapis.com/mayash/website/mayash-introduction.jpg',
  },
  {
    title: 'Motivation',
    description: `Bharath as 'The land of knowledge' has known for centuries but in last few centuries we
        have gone through lot of suffering and changes which has pulled us backward. We
        are committed to return that glories`,
    url: '/motivation',
    imageUrl: 'https://storage.googleapis.com/mayash/website/mayash-motivation-1.jpg',
  },
  {
    title: 'About Us',
    description: 'To-Do',
    url: '/about-us',
    imageUrl: 'https://storage.googleapis.com/mayash/website/mayash-about-us.jpg',
  },
  {
    title: 'Products And Services',
    description: `As there are so many product and services related to education. Our efforts
        are to provide world-class education at your door-step.`,
    url: '/product-and-services',
    imageUrl: 'https://storage.googleapis.com/mayash/website/mayash-product-and-services.jpg',
  },
  {
    title: 'Sponsors',
    description: 'We are very thankful for all your support.',
    url: '/sponsors',
    imageUrl: 'https://storage.googleapis.com/mayash/website/mayash-sponsors.jpg',
  },
  {
    title: 'Team',
    description: 'Team',
    url: '/team',
    imageUrl: 'https://storage.googleapis.com/mayash/website/mayash-team.jpg',
  },
  {
    title: 'Customer Reviews',
    description: 'Customer Reviews',
    url: '/customer-reviews',
    imageUrl: 'https://storage.googleapis.com/mayash/website/mayash-customer-reviews.jpg',
  },
];

export default () => (
  <div style={style.landingPage}>
    {CardList.map(card => <Card key={card.url} {...card} />)}
  </div>
);
