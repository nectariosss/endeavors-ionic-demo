// in-memory-data.service.ts
import { InMemoryDbService } from 'angular-in-memory-web-api';
import { Endeavor } from 'src/app/endeavors/models/endeavor';

export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    const endeavors: Endeavor[] = [
      {
        name: 'sapphire process',
        isAmbient: false,
        isAttainable: true,
        isActive: false,
        archived: false,
        completed: false,
        instantAim: 'get into the habbit of a weekly workout routine',
        longAim: 'be in physical shape, improve health and confidence',
        abstract: '',
        tasks: [
          {
            name: 'get a big water bottle',
            description: ''
          },
          {
            name: 'get a gym bag',
            description: ''
          },
          {
            name: 'get workout clothes',
            description: ''
          }
        ],
        ideas: [
          {
            name: 'subscribe to a local gym',
            description: ''
          },
          {
            name: 'download and try out a fitness app',
            description: ''
          },
          {
            name: 'find a nearby park where people work out',
            description: ''
          },
          {
            name: 'ask a friend to work out together',
            description: ''
          },
        ],
        problems: [],
        resources: [
          {
            name: 'https://www.muscleandfitness.com/workout-plan/workouts/workout-routines/complete-mf-beginners-training-guide-plan/',
            description: ''
          },
        ],
        directives: [
          {
            name: 'workout 3 times a week',
            description: ''
          },
        ],
        timeframe: {
          hasTimeFrame: true,
          start: new Date(2023, 9, 10),
          end: new Date(2023, 11, 10),
        },
        score: {
          hasScore: true,
          upvotes: 0,
        },
        notes: '',
      },
      {
        name: 'moonstones',
        isAmbient: true,
        isAttainable: true,
        isActive: false,
        archived: false,
        completed: false,
        instantAim: 'keep in touch with friends and realatives',
        longAim: 'maintain a social life and a healthy relationship with friends and family',
        abstract: '',
        tasks: [
          {
            name: 'put reminders for the birthdays of close friends and family',
            description: ''
          },
        ],
        ideas: [
        ],
        problems: [],
        resources: [
        ],
        directives: [
          {
            name: 'text or call a friend or family member every weekend',
            description: ''
          },
        ],
        timeframe: {
          hasTimeFrame: false,
          start: null,
          end: null,
        },
        score: {
          hasScore: false,
          upvotes: 0,
        },
        notes: '',
      },
      {
        name: 'zircon',
        isAmbient: true,
        isAttainable: true,
        isActive: false,
        archived: false,
        completed: false,
        instantAim: 'travel regurarly',
        longAim: 'explore and experience the world and its cultures',
        abstract: '',
        tasks: [
          {
            name: 'get a travel bag',
            description: ''
          },
          {
            name: 'arrange IDs, documents, and passports',
            description: ''
          },
          {
            name: 'fix a small bag with all the hygiene essentials to always have it ready',
            description: ''
          },
        ],
        ideas: [
        ],
        problems: [],
        resources: [
        ],
        directives: [
          {
            name: 'always book flight tickets in advance to save money',
            description: ''
          },
        ],
        timeframe: {
          hasTimeFrame: false,
          start: null,
          end: null,
        },
        score: {
          hasScore: false,
          upvotes: 0,
        },
        notes: '',
      },
      {
        name: 'Spinel web',
        isAmbient: false,
        isAttainable: true,
        isActive: true,
        archived: false,
        completed: false,
        instantAim: 'develop a platform for video creators',
        longAim: 'provide an alternative to youtube for video creators',
        abstract: 'A platform where video creators can embed interactive elements directly into their videos, such as clickable quizzes, embedded polls, choose-your-own-adventure story paths, etc.',
        tasks: [
          {
            name: 'dockerise the server application',
            description: ''
          },
          {
            name: 'change the X icons to trash icons on deletes',
            description: ''
          },
          {
            name: 'add a loading spinner on the login page',
            description: ''
          },
          {
            name: 'set up a CI/CD pipeline',
            description: ''
          },
        ],
        ideas: [
          {
            name: 'add animations to box containers',
            description: ''
          },
        ],
        problems: [
          {
            name: 'need to find a way to test the server application without the database',
            description: ''
          },
        ],
        resources: [
        ],
        directives: [
        ],
        timeframe: {
          hasTimeFrame: false,
          start: null,
          end: null,
        },
        score: {
          hasScore: true,
          upvotes: 5,
        },
        notes: '',
      },
      {
        name: 'core of ruby',
        isAmbient: false,
        isAttainable: true,
        isActive: false,
        archived: true,
        completed: false,
        instantAim: 'complete a lifestyle challenge',
        longAim: 'improve focus',
        abstract: '',
        tasks: [
          {
            name: 'get a soft pillow',
            description: ''
          },
          {
            name: 'get an alarm clock',
            description: ''
          },
        ],
        ideas: [
        ],
        problems: [
        ],
        resources: [
        ],
        directives: [
          {
            name: 'no screen two hours before sleep',
            description: ''
          },
          {
            name: 'meditate for 30 mins after waking up',
            description: ''
          },
          {
            name: 'don\'t eat after 8pm',
            description: ''
          },
          {
            name: 'don\'t watch videos while eating',
            description: ''
          },
        ],
        timeframe: {
          hasTimeFrame: false,
          start: new Date(2023, 11, 1),
          end: new Date(2023, 12, 1),
        },
        score: {
          hasScore: true,
          upvotes: 0,
        },
        notes: '',
      },
    ];
    return { endeavors }; // this sets up an endpoint /api/users
  }
}
