import type { Quote } from "@/types/content";

/**
 * Mirrors the pool that drives the "Quote of the Day" block on Kamal's GitHub
 * profile README (Sayrikey1/Sayrikey1, master branch, quotes/quotes.json).
 *
 * Text and attribution are verbatim from that file, honorifics included —
 * "(PBUH)" and "(RA)" are part of the attribution and must not be trimmed.
 * The GitHub Action there rotates the README daily at 06:00 UTC by random
 * choice; this site instead selects deterministically from the day, so the
 * quote is stable for any given date and still changes every day.
 *
 * To refresh after adding quotes upstream, re-copy from:
 * https://raw.githubusercontent.com/Sayrikey1/Sayrikey1/master/quotes/quotes.json
 */
export const quotes: Quote[] = [
  {
    text: "The best of people are those who are most beneficial to people.",
    author: "Prophet Muhammad (PBUH)",
    tradition: "islamic",
  },
  {
    text: "Speak good or remain silent.",
    author: "Prophet Muhammad (PBUH)",
    tradition: "islamic",
  },
  {
    text: "The strong person is not the one who can wrestle someone else down. The strong person is the one who can control himself when he is angry.",
    author: "Prophet Muhammad (PBUH)",
    tradition: "islamic",
  },
  {
    text: "Make things easy and do not make them difficult. Give good news and do not drive people away.",
    author: "Prophet Muhammad (PBUH)",
    tradition: "islamic",
  },
  {
    text: "Seek knowledge from the cradle to the grave.",
    author: "Prophet Muhammad (PBUH)",
    tradition: "islamic",
  },
  {
    text: "He who is not merciful to others, will not be treated mercifully.",
    author: "Prophet Muhammad (PBUH)",
    tradition: "islamic",
  },
  {
    text: "The best among you are those who have the best manners and character.",
    author: "Prophet Muhammad (PBUH)",
    tradition: "islamic",
  },
  {
    text: "Do not waste water even if you were at a running stream.",
    author: "Prophet Muhammad (PBUH)",
    tradition: "islamic",
  },
  {
    text: "A person's true wealth is the good he or she does in the world.",
    author: "Prophet Muhammad (PBUH)",
    tradition: "islamic",
  },
  {
    text: "Kindness is a mark of faith, and whoever has not kindness has not faith.",
    author: "Prophet Muhammad (PBUH)",
    tradition: "islamic",
  },
  {
    text: "None of you truly believes until he loves for his brother what he loves for himself.",
    author: "Prophet Muhammad (PBUH)",
    tradition: "islamic",
  },
  {
    text: "Patience is the key to relief.",
    author: "Prophet Muhammad (PBUH)",
    tradition: "islamic",
  },
  {
    text: "Be in this world as if you were a stranger or a traveler along a path.",
    author: "Prophet Muhammad (PBUH)",
    tradition: "islamic",
  },
  {
    text: "Every act of goodness is charity.",
    author: "Prophet Muhammad (PBUH)",
    tradition: "islamic",
  },
  {
    text: "The best jihad is to speak a word of truth to an oppressive ruler.",
    author: "Prophet Muhammad (PBUH)",
    tradition: "islamic",
  },
  {
    text: "By Allah, he does not believe! By Allah, he does not believe! By Allah, he does not believe! It was asked: Who, O Messenger of Allah? He said: The one whose neighbor does not feel safe from his evil.",
    author: "Prophet Muhammad (PBUH)",
    tradition: "islamic",
  },
  {
    text: "Be truthful, for truthfulness leads to righteousness, and righteousness leads to Paradise.",
    author: "Abu Bakr As-Siddiq (RA)",
    tradition: "islamic",
  },
  {
    text: "Without knowledge, action is useless and knowledge without action is futile.",
    author: "Abu Bakr As-Siddiq (RA)",
    tradition: "islamic",
  },
  {
    text: "Good actions are a guard against the blows of adversity.",
    author: "Abu Bakr As-Siddiq (RA)",
    tradition: "islamic",
  },
  {
    text: "The more knowledge you have, the greater will be your fear of Allah.",
    author: "Abu Bakr As-Siddiq (RA)",
    tradition: "islamic",
  },
  {
    text: "If an ignorant person is attracted by the things of the world, that is bad. But if a learned person is attracted by the things of the world, that is worse.",
    author: "Abu Bakr As-Siddiq (RA)",
    tradition: "islamic",
  },
  {
    text: "Do not follow vain desires, for verily he who prospers is preserved from lust, greed and anger.",
    author: "Abu Bakr As-Siddiq (RA)",
    tradition: "islamic",
  },
  {
    text: "Preach not to others what they should eat, but eat as becomes you and be silent.",
    author: "Abu Bakr As-Siddiq (RA)",
    tradition: "islamic",
  },
  {
    text: "Do not look down upon any Muslim, for even the most inferior believer is great in the eyes of God.",
    author: "Abu Bakr As-Siddiq (RA)",
    tradition: "islamic",
  },
  {
    text: "The greatest truth is honesty, and the greatest falsehood is dishonesty.",
    author: "Abu Bakr As-Siddiq (RA)",
    tradition: "islamic",
  },
  {
    text: "He who avoids complaint invites happiness.",
    author: "Abu Bakr As-Siddiq (RA)",
    tradition: "islamic",
  },
  {
    text: "Do not deceive or be faithless even with your enemy.",
    author: "Umar ibn Al-Khattab (RA)",
    tradition: "islamic",
  },
  {
    text: "The most beloved of people to Allah are those who are most beneficial to people.",
    author: "Umar ibn Al-Khattab (RA)",
    tradition: "islamic",
  },
  {
    text: "Patience is the healthiest ingredient of our life.",
    author: "Umar ibn Al-Khattab (RA)",
    tradition: "islamic",
  },
  {
    text: "Hold yourself accountable before you are held accountable.",
    author: "Umar ibn Al-Khattab (RA)",
    tradition: "islamic",
  },
  {
    text: "May God bless the man who says less and does more.",
    author: "Umar ibn Al-Khattab (RA)",
    tradition: "islamic",
  },
  {
    text: "Knowledge is only achieved through learning and patience is only achieved through trying to be patient.",
    author: "Ali ibn Abi Talib (RA)",
    tradition: "islamic",
  },
  {
    text: "A person's intellect becomes apparent from his speech, and his merit is known through his actions.",
    author: "Ali ibn Abi Talib (RA)",
    tradition: "islamic",
  },
  {
    text: "Do not let your difficulties fill you with anxiety; after all, it is only in the darkest nights that stars shine more brightly.",
    author: "Ali ibn Abi Talib (RA)",
    tradition: "islamic",
  },
  {
    text: "The tongue is like a lion. If you let it loose, it will wound someone.",
    author: "Ali ibn Abi Talib (RA)",
    tradition: "islamic",
  },
  {
    text: "Two things define you: your patience when you have nothing, and your attitude when you have everything.",
    author: "Ali ibn Abi Talib (RA)",
    tradition: "islamic",
  },
  {
    text: "There is no wealth like knowledge, and no poverty like ignorance.",
    author: "Ali ibn Abi Talib (RA)",
    tradition: "islamic",
  },
  {
    text: "Impossible is a word to be found only in the dictionary of fools.",
    author: "Napoleon Bonaparte",
    tradition: "classical",
  },
  {
    text: "The world suffers a lot. Not because of the violence of bad people, but because of the silence of good people.",
    author: "Napoleon Bonaparte",
    tradition: "classical",
  },
  {
    text: "Victory belongs to the most persevering.",
    author: "Napoleon Bonaparte",
    tradition: "classical",
  },
  {
    text: "Courage is not having the strength to go on; it is going on when you don't have the strength.",
    author: "Napoleon Bonaparte",
    tradition: "classical",
  },
  {
    text: "In politics, stupidity is not a handicap.",
    author: "Napoleon Bonaparte",
    tradition: "classical",
  },
  {
    text: "The battlefield is a scene of constant chaos. The winner will be the one who controls that chaos.",
    author: "Napoleon Bonaparte",
    tradition: "classical",
  },
  {
    text: "Great ambition is the passion of a great character. Those endowed with it may perform very good or very bad acts. All depends on the principles which direct them.",
    author: "Napoleon Bonaparte",
    tradition: "classical",
  },
  {
    text: "A leader is a dealer in hope.",
    author: "Napoleon Bonaparte",
    tradition: "classical",
  },
  {
    text: "Take time to deliberate, but when the time for action has arrived, stop thinking and go in.",
    author: "Napoleon Bonaparte",
    tradition: "classical",
  },
  {
    text: "The only way to do great work is to know your own genius and apply it relentlessly.",
    author: "Napoleon Bonaparte",
    tradition: "classical",
  },
  {
    text: "Nothing is more difficult, and therefore more precious, than to be able to decide.",
    author: "Napoleon Bonaparte",
    tradition: "classical",
  },
  {
    text: "Ability is nothing without opportunity.",
    author: "Napoleon Bonaparte",
    tradition: "classical",
  },
  {
    text: "He who fears being conquered is sure of defeat.",
    author: "Napoleon Bonaparte",
    tradition: "classical",
  },
  {
    text: "I came, I saw, I conquered.",
    author: "Julius Caesar",
    tradition: "classical",
  },
  {
    text: "Experience is the teacher of all things.",
    author: "Julius Caesar",
    tradition: "classical",
  },
  {
    text: "It is easier to find men who will volunteer to die, than to find those who are willing to endure pain with patience.",
    author: "Julius Caesar",
    tradition: "classical",
  },
  {
    text: "In war, events of importance are the result of trivial causes.",
    author: "Julius Caesar",
    tradition: "classical",
  },
  {
    text: "If you must break the law, do it to seize power: in all other cases observe it.",
    author: "Julius Caesar",
    tradition: "classical",
  },
  {
    text: "It is not these well-fed long-haired men that I fear, but the pale and the hungry-looking.",
    author: "Julius Caesar",
    tradition: "classical",
  },
  {
    text: "The die is cast.",
    author: "Julius Caesar",
    tradition: "classical",
  },
  {
    text: "What we wish, we readily believe, and what we ourselves think, we imagine others think also.",
    author: "Julius Caesar",
    tradition: "classical",
  },
  {
    text: "Men willingly believe what they wish.",
    author: "Julius Caesar",
    tradition: "classical",
  },
  {
    text: "Fortune, which has a great deal of power in other matters but especially in war, can bring about great changes in a situation through very slight forces.",
    author: "Julius Caesar",
    tradition: "classical",
  },
  {
    text: "I love the name of honor, more than I fear death.",
    author: "Julius Caesar",
    tradition: "classical",
  },
  {
    text: "No one is so brave that he is not disturbed by something unexpected.",
    author: "Julius Caesar",
    tradition: "classical",
  },
  {
    text: "It is better to create than to learn! Creating is the essence of life.",
    author: "Julius Caesar",
    tradition: "classical",
  },
];

/**
 * Days elapsed since the Unix epoch in the viewer's own timezone, so the
 * quote turns over at their local midnight rather than UTC's.
 */
export function dayNumber(date: Date) {
  const local = new Date(date.getFullYear(), date.getMonth(), date.getDate());
  return Math.floor(local.getTime() / 86_400_000);
}

/** Stable for a given day, and every day lands on a different entry. */
export function quoteForDate(date: Date): Quote {
  const index =
    ((dayNumber(date) % quotes.length) + quotes.length) % quotes.length;
  return quotes[index]!;
}
