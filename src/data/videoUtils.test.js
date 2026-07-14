import test from 'node:test';
import assert from 'node:assert/strict';
import { getYouTubeEmbedUrl } from './videoUtils.js';

test('getYouTubeEmbedUrl parses youtu.be short links', () => {
  assert.equal(
    getYouTubeEmbedUrl('https://youtu.be/c_9REs36e8o?si=JwxYCNv9GHlLYT7g'),
    'https://www.youtube-nocookie.com/embed/c_9REs36e8o',
  );
});

test('getYouTubeEmbedUrl parses youtube.com watch links', () => {
  assert.equal(
    getYouTubeEmbedUrl('https://www.youtube.com/watch?v=4zkauj_W34U'),
    'https://www.youtube-nocookie.com/embed/4zkauj_W34U',
  );
});

test('getYouTubeEmbedUrl returns null for unrecognized urls', () => {
  assert.equal(getYouTubeEmbedUrl('https://example.com/video'), null);
  assert.equal(getYouTubeEmbedUrl('not a url'), null);
});
