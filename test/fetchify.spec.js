import fetchify from '../src/fetchify';

describe('fetchify', () => {
  describe('return a transformed object', () => {
    const data = {
      id: 1,
      post_id: 77,
      created_at: '2019-08-11 20:43:00',
      updated_at: '2019-08-11 20:43:00',
    };
    const result = {
      id: 1,
      postId: 77,
      createdAt: '2019-08-11 20:43:00',
      updatedAt: '2019-08-11 20:43:00',
    };

    it('should return a transformed object', () => {
      expect(fetchify(data)).toEqual(result);
    });
  });

  describe('return a transformed array', () => {
    const data = {
      new_posts: [
        {
          id: 11,
          user_id: 3,
          created_at: '2019-08-11 21:43:00',
          updated_at: '2019-08-11 21:43:00',
        },
        {
          id: 12,
          user_id: 12,
          created_at: '2019-08-11 22:43:00',
          updated_at: '2019-08-11 22:43:00',
        },
      ],
    };
    const result = {
      newPosts: [
        {
          id: 11,
          userId: 3,
          createdAt: '2019-08-11 21:43:00',
          updatedAt: '2019-08-11 21:43:00',
        },
        {
          id: 12,
          userId: 12,
          createdAt: '2019-08-11 22:43:00',
          updatedAt: '2019-08-11 22:43:00',
        },
      ],
    };

    it('should return a transformed array', () => {
      expect(fetchify(data)).toEqual(result);
    });
  });

  describe('return a deep nested object', () => {
    const data = {
      new_posts: [
        {
          authors: [
            {
              id: 1,
              user_id: 1,
            },
          ],
        },
        {
          tags: [
            'super_news',
            'very_long_tag_name',
          ],
        },
        {
          test: {
            another_test: [
              'hello_world',
              '',
              {
                test_string: '',
              },
            ],
          },
        },
      ],
    };
    const result = {
      newPosts: [
        {
          authors: [
            {
              id: 1,
              userId: 1,
            },
          ],
        },
        {
          tags: [
            'super_news',
            'very_long_tag_name',
          ],
        },
        {
          test: {
            anotherTest: [
              'hello_world',
              '',
              {
                testString: '',
              },
            ],
          },
        },
      ],
    };

    it('should return a transformed array', () => {
      expect(fetchify(data)).toEqual(result);
    });
  });
});

