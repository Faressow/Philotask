/* ═══════════════════════════════════════════════════════════
   TasK-A-Lad — Philosopher/Saint Data & Quotes Database
   ═══════════════════════════════════════════════════════════ */

const PHILOSOPHERS = [
  { id: 'socrates',        name: 'Socrates',            cardName: 'Socrates',      image: 'images/socrates.png',        origin: 'Greek',     color: '#4fc3f7', initials: 'SO', isSaint: false },
  { id: 'aristotle',       name: 'Aristotle',           cardName: 'Aristotle',     image: 'images/aristotle.png',       origin: 'Greek',     color: '#81c784', initials: 'AR', isSaint: false },
  { id: 'marcus_aurelius', name: 'Marcus Aurelius',     cardName: 'M. Aurelius',   image: 'images/marcus_aurelius.png', origin: 'Roman',     color: '#e57373', initials: 'MA', isSaint: false },
  { id: 'sun_tzu',         name: 'Sun Tzu',             cardName: 'Sun Tzu',       image: 'images/sun_tzu.png',         origin: 'Chinese',   color: '#ffb74d', initials: 'ST', isSaint: false },
  { id: 'confucius',       name: 'Confucius',           cardName: 'Confucius',     image: 'images/confucius.png',       origin: 'Chinese',   color: '#f06292', initials: 'CO', isSaint: false },
  { id: 'pascal',          name: 'Blaise Pascal',       cardName: 'B. Pascal',     image: 'images/pascal.png',          origin: 'French',    color: '#ba68c8', initials: 'BP', isSaint: false },
  { id: 'seneca',          name: 'Seneca',              cardName: 'Seneca',        image: 'images/seneca.jpg',          origin: 'Roman',     color: '#4db6ac', initials: 'SE', isSaint: false },
  { id: 'epictetus',       name: 'Epictetus',           cardName: 'Epictetus',     image: 'images/epictetus.png',       origin: 'Greek',     color: '#aed581', initials: 'EP', isSaint: false },
  { id: 'laozi',           name: 'Lao Tzu',             cardName: 'Lao Tzu',       image: 'images/laozi.jpg',           origin: 'Chinese',   color: '#9575cd', initials: 'LT', isSaint: false },
  { id: 'plato',           name: 'Plato',               cardName: 'Plato',         image: 'images/plato.jpg',           origin: 'Greek',     color: '#64b5f6', initials: 'PL', isSaint: false },
  { id: 'chrysostom',      name: 'St. John Chrysostom', cardName: 'Chrysostom',    image: 'images/chrysostom.jpg',      origin: 'Christian', color: '#ffd54f', initials: 'JC', isSaint: true },
  { id: 'basil',           name: 'St. Basil the Great', cardName: 'St. Basil',     image: 'images/basil.jpg',           origin: 'Christian', color: '#a5d6a7', initials: 'SB', isSaint: true },
  { id: 'paul',            name: 'St. Paul',            cardName: 'St. Paul',      image: 'images/paul.jpg',            origin: 'Christian', color: '#ef9a9a', initials: 'SP', isSaint: true },
  { id: 'jesus',           name: 'Jesus Christ',        cardName: 'Jesus Christ',  image: 'images/jesus.jpg',           origin: 'Christian', color: '#ffe082', initials: 'IC', isSaint: true },
];

const QUOTES = {
  welcome: [
    // Socrates
    { text: 'The unexamined life is not worth living.', author: 'socrates', source: 'Apology, 38a' },
    { text: 'True knowledge exists in knowing that you know nothing.', author: 'socrates', source: 'Apology, 21d (via Plato)' },
    { text: 'Education is the kindling of a flame, not the filling of a vessel.', author: 'socrates', source: 'Attributed via Plutarch, On Listening to Lectures' },

    // Aristotle
    { text: 'Knowing yourself is the beginning of all wisdom.', author: 'aristotle', source: 'Nicomachean Ethics (attributed)' },
    { text: 'In all things of nature there is something of the marvelous.', author: 'aristotle', source: 'Parts of Animals, Book I.5' },

    // Marcus Aurelius
    { text: 'When you arise in the morning, think of what a precious privilege it is to be alive — to breathe, to think, to enjoy, to love.', author: 'marcus_aurelius', source: 'Meditations, Book II.1' },
    { text: 'Dwell on the beauty of life. Watch the stars, and see yourself running with them.', author: 'marcus_aurelius', source: 'Meditations, Book VII.47' },
    { text: 'Accept the things to which fate binds you, and love the people with whom fate brings you together.', author: 'marcus_aurelius', source: 'Meditations, Book VI.39' },

    // Confucius
    { text: 'It does not matter how slowly you go as long as you do not stop.', author: 'confucius', source: 'The Analects (attributed)' },
    { text: 'When you know a thing, to hold that you know it; and when you do not know a thing, to allow that you do not know it — this is knowledge.', author: 'confucius', source: 'The Analects, II.17' },

    // Pascal
    { text: 'All of humanity\'s problems stem from man\'s inability to sit quietly in a room alone.', author: 'pascal', source: 'Pensées, §139' },
    { text: 'The eternal silence of these infinite spaces frightens me.', author: 'pascal', source: 'Pensées, §201' },

    // Seneca
    { text: 'We suffer more in imagination than in reality.', author: 'seneca', source: 'Letters to Lucilius, Letter 13' },
    { text: 'Associate with people who are likely to improve you.', author: 'seneca', source: 'Letters to Lucilius, Letter 7' },

    // Epictetus
    { text: 'It is not what happens to you, but how you react to it that matters.', author: 'epictetus', source: 'Enchiridion, 1 (paraphrase)' },
    { text: 'Seek not the good in external things; seek it in yourself.', author: 'epictetus', source: 'Discourses, Book II.16' },

    // Laozi
    { text: 'A journey of a thousand miles begins with a single step.', author: 'laozi', source: 'Tao Te Ching, Ch. 64' },
    { text: 'He who knows does not speak. He who speaks does not know.', author: 'laozi', source: 'Tao Te Ching, Ch. 56' },

    // Plato
    { text: 'The measure of a man is what he does with power.', author: 'plato', source: 'The Republic (attributed)' },
    { text: 'The soul takes nothing with her to the next world but her education and culture.', author: 'plato', source: 'Phaedo, 107d' },
    { text: 'Wise men speak because they have something to say; fools because they have to say something.', author: 'plato', source: 'Attributed via Diogenes Laërtius' },

    // Chrysostom
    { text: 'Would you become a pillar of the Church? Lean first upon Christ.', author: 'chrysostom', source: 'Homilies on Ephesians, Homily 11' },
    { text: 'Prayer is the place of refuge for every worry, a foundation for cheerfulness, a source of constant happiness, a protection against sadness.', author: 'chrysostom', source: 'On Prayer, Homily 6' },

    // Basil
    { text: 'A tree is known by its fruit; a man by his deeds. A good deed is never lost.', author: 'basil', source: 'Homily on Humility' },
    { text: 'The beginning of the way to virtue is the recognition that we are capable of it.', author: 'basil', source: 'Address to Young Men, Ch. 2' },
    { text: 'Teach your tongue to say "I do not know," and you will make progress.', author: 'basil', source: 'Homily 10, On Humility' },

    // Paul
    { text: 'I can do all things through Christ who strengthens me.', author: 'paul', source: 'Philippians 4:13' },
    { text: 'Let no one despise your youth, but be an example to the believers in word, in conduct, in love.', author: 'paul', source: '1 Timothy 4:12' },
    { text: 'Do not conform to the pattern of this world, but be transformed by the renewing of your mind.', author: 'paul', source: 'Romans 12:2' },
    { text: 'And now these three remain: faith, hope and love. But the greatest of these is love.', author: 'paul', source: '1 Corinthians 13:13' },

    // Jesus
    { text: 'Come to me, all you who are weary and burdened, and I will give you rest.', author: 'jesus', source: 'Matthew 11:28' },
    { text: 'I am the light of the world. Whoever follows me will not walk in darkness.', author: 'jesus', source: 'John 8:12' },
    { text: 'I am the way, the truth, and the life.', author: 'jesus', source: 'John 14:6' },
    { text: 'Love your enemies and pray for those who persecute you.', author: 'jesus', source: 'Matthew 5:44' },
    { text: 'The truth will set you free.', author: 'jesus', source: 'John 8:32' },
  ],

  taskCreated: [
    // Aristotle
    { text: 'Well begun is half done.', author: 'aristotle', source: 'Politics, Book V.4' },
    { text: 'The roots of education are bitter, but the fruit is sweet.', author: 'aristotle', source: 'Attributed via Diogenes Laërtius, Lives, Book V' },

    // Socrates
    { text: 'Let him who would move the world first move himself.', author: 'socrates', source: 'Attributed via Plutarch' },

    // Seneca
    { text: 'Begin at once to live, and count each separate day as a separate life.', author: 'seneca', source: 'Letters to Lucilius, Letter 101' },
    { text: 'While we postpone, life speeds by.', author: 'seneca', source: 'Letters to Lucilius, Letter 1.1' },
    { text: 'He who is everywhere is nowhere.', author: 'seneca', source: 'Letters to Lucilius, Letter 2' },
    { text: 'Delay not; swift is the flight of fortune\'s greatest favours.', author: 'seneca', source: 'De Brevitate Vitae, Ch. 9' },
    { text: 'As long as you live, keep learning how to live.', author: 'seneca', source: 'Letters to Lucilius, Letter 76.3' },

    // Sun Tzu
    { text: 'Opportunities multiply as they are seized.', author: 'sun_tzu', source: 'The Art of War, Ch. 5 (attributed)' },
    { text: 'Attack is the secret of defense; defense is the planning of an attack.', author: 'sun_tzu', source: 'The Art of War, Ch. 6' },
    { text: 'He who knows when he can fight and when he cannot will be victorious.', author: 'sun_tzu', source: 'The Art of War, Ch. 3' },
    { text: 'Let your plans be dark and impenetrable as night, and when you move, fall like a thunderbolt.', author: 'sun_tzu', source: 'The Art of War, Ch. 7' },
    { text: 'All warfare is based on deception.', author: 'sun_tzu', source: 'The Art of War, Ch. 1' },

    // Marcus Aurelius
    { text: 'You have power over your mind — not outside events. Realize this, and you will find strength.', author: 'marcus_aurelius', source: 'Meditations, Book VI.8' },
    { text: 'The impediment to action advances action. What stands in the way becomes the way.', author: 'marcus_aurelius', source: 'Meditations, Book V.20' },
    { text: 'Acquire the habit of attending carefully to what is said by another, and of entering, as far as possible, into the mind of the speaker.', author: 'marcus_aurelius', source: 'Meditations, Book VI.53' },

    // Pascal
    { text: 'The heart has its reasons which reason knows nothing of.', author: 'pascal', source: 'Pensées, §277' },

    // Laozi
    { text: 'A thousand-mile journey begins beneath one\'s feet.', author: 'laozi', source: 'Tao Te Ching, Ch. 64' },
    { text: 'Nothing in the world is as soft and yielding as water. Yet for dissolving the hard and inflexible, nothing can surpass it.', author: 'laozi', source: 'Tao Te Ching, Ch. 78' },

    // Epictetus
    { text: 'First say to yourself what you would be; then do what you have to do.', author: 'epictetus', source: 'Discourses, Book III.23' },
    { text: 'Make the best use of what is in your power, and take the rest as it happens.', author: 'epictetus', source: 'Enchiridion, 1' },
    { text: 'Men are disturbed not by the things which happen, but by the opinions about the things.', author: 'epictetus', source: 'Enchiridion, 5' },

    // Confucius
    { text: 'He who learns but does not think is lost. He who thinks but does not learn is in great danger.', author: 'confucius', source: 'The Analects, II.15' },
    { text: 'He who is not courageous enough to take risks will accomplish nothing in life.', author: 'confucius', source: 'The Analects (attributed)' },

    // Plato
    { text: 'Education is teaching our children to desire the right things.', author: 'plato', source: 'The Republic, Book IV' },

    // Jesus
    { text: 'Take therefore no thought for the morrow: for the morrow shall take thought for the things of itself.', author: 'jesus', source: 'Matthew 6:34' },
    { text: 'Ask and it will be given to you; seek and you will find; knock and the door will be opened to you.', author: 'jesus', source: 'Matthew 7:7' },

    // Paul
    { text: 'For God has not given us a spirit of fear, but of power and of love and of a sound mind.', author: 'paul', source: '2 Timothy 1:7' },
    { text: 'Whatever you do, work at it with all your heart, as working for the Lord, not for human masters.', author: 'paul', source: 'Colossians 3:23' },
    { text: 'Let us not become weary in doing good, for at the proper time we will reap a harvest.', author: 'paul', source: 'Galatians 6:9' },
    { text: 'For we walk by faith, not by sight.', author: 'paul', source: '2 Corinthians 5:7' },

    // Chrysostom
    { text: 'Do not wait for leaders; do it alone, person to person.', author: 'chrysostom', source: 'Homilies on the Acts of the Apostles, Homily 20' },
    { text: 'The richness of the mind is the only true wealth.', author: 'chrysostom', source: 'Homilies on the Gospel of John, Homily 32' },
    { text: 'No one can harm the man who does not injure himself.', author: 'chrysostom', source: 'No One Can Harm the Man Who Does Not Injure Himself, Homily I' },

    // Basil
    { text: 'The bread which you do not use is the bread of the hungry; the garment hanging in your wardrobe is the garment of him who is naked.', author: 'basil', source: 'Homily 6, On Avarice (I Will Pull Down My Barns)' },
  ],

  taskCompleted: [
    // Aristotle
    { text: 'Happiness depends upon ourselves.', author: 'aristotle', source: 'Nicomachean Ethics, Book I' },
    { text: 'Pleasure in the job puts perfection in the work.', author: 'aristotle', source: 'Nicomachean Ethics, Book X.4' },
    { text: 'We are what we repeatedly do. Excellence, then, is not an act, but a habit.', author: 'aristotle', source: 'Nicomachean Ethics, Book II (paraphrased by Will Durant)' },
    { text: 'Wit is educated insolence.', author: 'aristotle', source: 'Rhetoric, Book II.12' },

    // Sun Tzu
    { text: 'Victorious warriors win first and then go to war, while defeated warriors go to war first and then seek to win.', author: 'sun_tzu', source: 'The Art of War, Ch. 4' },
    { text: 'Supreme excellence consists in breaking the enemy\'s resistance without fighting.', author: 'sun_tzu', source: 'The Art of War, Ch. 3' },

    // Confucius
    { text: 'Our greatest glory is not in never falling, but in rising every time we fall.', author: 'confucius', source: 'Attributed to Confucius; cited in Goldsmith, The Citizen of the World (1762)' },
    { text: 'He who conquers himself is the mightiest warrior.', author: 'confucius', source: 'The Analects (attributed)' },
    { text: 'When the archer misses the mark, he turns round and seeks for the cause within himself.', author: 'confucius', source: 'Doctrine of the Mean, Ch. 14' },
    { text: 'The superior man is satisfied and composed; the mean man is always full of distress.', author: 'confucius', source: 'The Analects, VII.37' },

    // Seneca
    { text: 'True happiness is to enjoy the present, without anxious dependence upon the future.', author: 'seneca', source: 'De Vita Beata, Ch. 5' },
    { text: 'The reward of a thing well done is to have done it.', author: 'seneca', source: 'Letters to Lucilius, Letter 81' },
    { text: 'He who is brave is free.', author: 'seneca', source: 'Letters to Lucilius, Letter 85' },
    { text: 'There is no easy way from the earth to the stars.', author: 'seneca', source: 'Hercules Furens, Act II' },

    // Marcus Aurelius
    { text: 'Waste no more time arguing about what a good man should be. Be one.', author: 'marcus_aurelius', source: 'Meditations, Book X.16' },
    { text: 'The happiness of your life depends upon the quality of your thoughts.', author: 'marcus_aurelius', source: 'Meditations, Book V.16' },
    { text: 'Very little is needed to make a happy life; it is all within yourself, in your way of thinking.', author: 'marcus_aurelius', source: 'Meditations, Book VII.67' },

    // Laozi
    { text: 'Nature does not hurry, yet everything is accomplished.', author: 'laozi', source: 'Tao Te Ching (paraphrase)' },
    { text: 'Knowing others is intelligence; knowing yourself is true wisdom.', author: 'laozi', source: 'Tao Te Ching, Ch. 33' },
    { text: 'Silence is a source of great strength.', author: 'laozi', source: 'Tao Te Ching (attributed)' },
    { text: 'To the mind that is still, the whole universe surrenders.', author: 'laozi', source: 'Attributed to Lao Tzu' },

    // Pascal
    { text: 'Man\'s greatness lies in his power of thought.', author: 'pascal', source: 'Pensées, §346' },
    { text: 'Faith is different from proof; the latter is human, the former is a gift from God.', author: 'pascal', source: 'Pensées, §248' },

    // Epictetus
    { text: 'No man is free who is not master of himself.', author: 'epictetus', source: 'Discourses, Book IV.1' },
    { text: 'Wealth consists not in having great possessions, but in having few wants.', author: 'epictetus', source: 'Discourses, Book III.24' },

    // Socrates
    { text: 'The only true wisdom is in knowing you know nothing.', author: 'socrates', source: 'Apology, 21d (Plato)' },
    { text: 'He is richest who is content with the least, for content is the wealth of nature.', author: 'socrates', source: 'Attributed via Diogenes Laërtius, Lives, Book II' },

    // Plato
    { text: 'Do not say a little in many words, but a great deal in a few.', author: 'plato', source: 'Protagoras, 329b' },
    { text: 'The beginning is the most important part of the work.', author: 'plato', source: 'The Republic, Book II' },
    { text: 'The price good men pay for indifference to public affairs is to be ruled by evil men.', author: 'plato', source: 'The Republic (attributed)' },

    // Jesus
    { text: 'Well done, good and faithful servant; you have been faithful over a little, I will set you over much.', author: 'jesus', source: 'Matthew 25:21' },
    { text: 'Do not let your left hand know what your right hand is doing.', author: 'jesus', source: 'Matthew 6:3' },
    { text: 'The one who endures to the end will be saved.', author: 'jesus', source: 'Matthew 24:13' },
    { text: 'Peace I leave with you; my peace I give you. I do not give to you as the world gives.', author: 'jesus', source: 'John 14:27' },
    { text: 'What does it profit a man to gain the whole world, yet forfeit his soul?', author: 'jesus', source: 'Mark 8:36' },
    { text: 'I am the resurrection and the life. The one who believes in me will live, even though they die.', author: 'jesus', source: 'John 11:25' },

    // Paul
    { text: 'I have fought the good fight, I have finished the race, I have kept the faith.', author: 'paul', source: '2 Timothy 4:7' },
    { text: 'I press on toward the goal to win the prize for which God has called me heavenward.', author: 'paul', source: 'Philippians 3:14' },
    { text: 'May the God of hope fill you with all joy and peace as you trust in him.', author: 'paul', source: 'Romans 15:13' },
    { text: 'Let all that you do be done in love.', author: 'paul', source: '1 Corinthians 16:14' },

    // Chrysostom
    { text: 'He who does not make the effort will not taste the honey.', author: 'chrysostom', source: 'Homilies on the Gospel of Matthew, Homily 43' },
    { text: 'Gold is tried in the fire, and acceptable men in the furnace of adversity.', author: 'chrysostom', source: 'Homilies on the Statues, Homily 17' },
    { text: 'If you cannot find Christ in the beggar at the church door, you will not find him in the chalice.', author: 'chrysostom', source: 'Homilies on the Gospel of Matthew, Homily 50' },

    // Basil
    { text: 'Strive for progress, not perfection, for God sees the heart.', author: 'basil', source: 'Longer Rules, Q. 2' },
    { text: 'Nothing is more powerful than gentleness in one who is truly great.', author: 'basil', source: 'Letter 2, To Gregory of Nazianzus' },
    { text: 'Many things are impossible to human weakness, but none to divine strength.', author: 'basil', source: 'Homily 8, On Martyrs (attributed)' },
  ],
};
