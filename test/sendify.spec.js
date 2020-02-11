import sendify from '../src/sendify';

describe('sendify', () => {
  describe('return a transformed object', () => {
    const data = {
      id: 1,
      productId: 77,
      createdAt: '2019-08-11 23:43:00',
      updatedAt: '2019-08-11 23:43:00',
    };
    const result = {
      id: 1,
      product_id: 77,
      created_at: '2019-08-11 23:43:00',
      updated_at: '2019-08-11 23:43:00',
    };

    it('should return a transformed object', () => {
      expect(sendify(data)).toEqual(result);
    });
  });

  describe('return a transformed array', () => {
    const data = {
      savedPosts: [
        {
          id: 55,
          userId: 2,
          createdAt: '2019-08-11 21:43:00',
          updatedAt: '2019-08-11 21:43:00',
        },
        {
          id: 134,
          userId: 14,
          createdAt: '2019-08-11 22:43:00',
          updatedAt: '2019-08-11 22:43:00',
        },
      ],
    };
    const result = {
      saved_posts: [
        {
          id: 55,
          user_id: 2,
          created_at: '2019-08-11 21:43:00',
          updated_at: '2019-08-11 21:43:00',
        },
        {
          id: 134,
          user_id: 14,
          created_at: '2019-08-11 22:43:00',
          updated_at: '2019-08-11 22:43:00',
        },
      ],
    };

    it('should return a transformed array', () => {
      expect(sendify(data)).toEqual(result);
    });
  });

  describe('return a deep nested object', () => {
    const data = {
      newPosts: [
        {
          authors: [
            {
              id: 1,
              userId: 1,
            },
            {
              id: 2,
              userId: 666,
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
              {
                testString: '',
              },
              {
                testString2: '222',
              },
            ],
          },
        },
      ],
    };
    const result = {
      new_posts: [
        {
          authors: [
            {
              id: 1,
              user_id: 1,
            },
            {
              id: 2,
              user_id: 666,
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
              {
                test_string: '',
              },
              {
                test_string2: '222',
              },
            ],
          },
        },
      ],
    };

    it('should return a transformed array', () => {
      expect(sendify(data)).toEqual(result);
    });
  });

  describe('filter empty arrays', () => {
    const data = {
      newPosts: [
        {
          authors: [
            {
              id: 1,
              userId: 1,
              posts: [],
            },
            {
              id: 2,
              userId: 666,
              posts: [1, 2, 5],
            },
          ],
        },
        {
          tags: [],
        },
      ],
    };
    const result = {
      new_posts: [
        {
          authors: [
            {
              id: 1,
              user_id: 1,
              posts: undefined,
            },
            {
              id: 2,
              user_id: 666,
              posts: [1, 2, 5],
            },
          ],
        },
        {
          tags: undefined,
        },
      ],
    };

    it('should return a transformed array without empty value', () => {
      expect(sendify(data)).toEqual(result);
    });
  });
});
