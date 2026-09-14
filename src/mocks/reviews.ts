import { Review } from '../pages/offer-page/types/types';

export const reviews: Review[] = [
  {
    'id': 'b67ddfd5-b953-4a30-8c8d-bd083cd6b62a',
    'date': '2025-01-08T14:13:56.569Z',
    'user': {
      'name': 'T-100',
      'avatarUrl': '/img/avatar-max.jpg',
      'isPro': true
    },
    'comment': 'I\'ll be back',
    'rating': 2
  },
  {
    'id': 'c67ddfd5-b953-4a30-8c8d-bd083cd6b62a',
    'date': '2019-05-09T14:13:56.569Z',
    'user': {
      'name': 'Sarah Connor',
      'avatarUrl': '/img/avatar-angelina.jpg',
      'isPro': false
    },
    'comment': 'The hardest thing is deciding what I should tell you and what not to. ... Should I tell you about your father? Boy, that\'s a tough one. Will it affect your decision to send him here, knowing that he is you father? If you don\'t send Kyle, you can never be. God, a person can go crazy thinking about all this... I suppose I will tell you... I owe him that. Maybe it\'ll be enough if you know that, in the few hours we had together, we loved a lifetime\'s worth.',
    'rating': 4
  }
];
