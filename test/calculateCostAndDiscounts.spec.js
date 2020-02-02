import moment from 'moment';
import calculateCostAndDiscounts from '../src/calculateCostAndDiscounts';

const orderStartsAt = '2019-07-14T12:00:00+03:00';
const orderExpiresAt = '2019-08-14T12:00:00+03:00';
const additionalServices = [
  {
    id: 1,
    price: 1500,
    image: 'storage/services/s8SpvCQlh6bI4FMA441j.jpg',
    title: 'GoPro Camera',
    description: null,
  },
  {
    id: 2,
    price: 1000,
    image: 'storage/services/0LeJrn4aw5YGVYgaYjlO.jpg',
    title: 'Nanny',
    description: null,
  },
  {
    id: 3,
    price: 10000,
    image: 'storage/services/bXTmgVsYx792FQJTiCiA.jpg',
    title: 'Accompanying boat',
    description: null,
  },
  {
    id: 4,
    price: 2000,
    image: 'storage/services/xIegKXzjOhIg9jl9s3yn.jpg',
    title: 'Wakeboard',
    description: null,
  },
  {
    id: 5,
    price: 3000,
    image: 'storage/services/yYxIQ2CmwY7XT0fOJyEv.jpg',
    title: 'JetSki Premium',
    description: null,
  },
];

describe('calculateCostAndDiscounts', () => {
  describe('primary calculation', () => {
    describe('return initial cost if there are no discounts', () => {
      const bookingType = 'partial';
      const scootersCount = 1;
      const calculations = {
        discountPrepayment: 10,
        scooterPrice: 15800,
        earlyDiscountDayCount: 30,
      };
      const selectedAdditionalServices = [{}, {}, {}, {}, {}];
      const result = [15800, 0, 15800, 0, 15800, 0, 15800, 0, 15800];

      it('should be equal [15800, 0, 15800, 0, 15800, 0, 15800, 0, 15800]', () => {
        expect(calculateCostAndDiscounts({
          calculations,
          scootersCount,
          bookingType,
          additionalServices,
          selectedAdditionalServices,
        })).toEqual(result);
      });
    });

    describe('return cost with prepayment discount', () => {
      const bookingType = 'full';
      const scootersCount = 1;
      const calculations = {
        discountPrepayment: 10,
        scooterPrice: 15800,
        earlyDiscountDayCount: 30,
      };
      const selectedAdditionalServices = [{}, {}, {}, {}, {}];
      const result = [15800, 0, 15800, 0, 15800, 10, 14220, 0, 14220];

      it('should be equal [15800, 0, 15800, 0, 15800, 10, 14220, 0, 14220]', () => {
        expect(calculateCostAndDiscounts({
          dateTour: moment().add(40, 'day'),
          calculations,
          scootersCount,
          bookingType,
          additionalServices,
          selectedAdditionalServices,
        })).toEqual(result);
      });
    });

    describe('return initial cost if promotion has not started', () => {
      const bookingType = 'partial';
      const scootersCount = 1;
      const dateTour = '2019-07-13T12:00:00+03:00';
      const calculations = {
        discountPrepayment: 10,
        discountPromotion: {
          value: 15,
          orderStartsAt,
          orderExpiresAt,
        },
        scooterPrice: 15800,
        earlyDiscountDayCount: 30,
      };
      const selectedAdditionalServices = [{}, {}, {}, {}, {}];
      const result = [15800, 0, 15800, 0, 15800, 0, 15800, 0, 15800];

      it('should be equal [15800, 0, 15800, 0, 15800, 0, 15800]', () => {
        expect(calculateCostAndDiscounts({
          calculations,
          scootersCount,
          bookingType,
          dateTour,
          additionalServices,
          selectedAdditionalServices,
        })).toEqual(result);
      });
    });

    describe('return cost with promotion discount', () => {
      const bookingType = 'partial';
      const scootersCount = 1;
      const dateTour = '2019-07-14T12:00:00+03:00';
      const calculations = {
        discountPrepayment: 10,
        discountPromotion: {
          value: 15,
          orderStartsAt,
          orderExpiresAt,
        },
        scooterPrice: 15800,
        earlyDiscountDayCount: 30,
      };
      const selectedAdditionalServices = [{}, {}, {}, {}, {}];
      const result = [15800, 15, 13430, 0, 13430, 0, 13430, 0, 13430];

      it('should be equal [15800, 15, 13430, 0, 13430, 0, 13430, 0, 13430]', () => {
        expect(calculateCostAndDiscounts({
          calculations,
          scootersCount,
          bookingType,
          dateTour,
          additionalServices,
          selectedAdditionalServices,
        })).toEqual(result);
      });
    });

    describe('return cost with promo-code discount', () => {
      const bookingType = 'partial';
      const scootersCount = 1;
      const dateTour = '2019-07-13T12:00:00+03:00';
      const calculations = {
        discountPrepayment: 10,
        discountPromotion: {
          value: 15,
          orderStartsAt,
          orderExpiresAt,
        },
        scooterPrice: 15800,
        earlyDiscountDayCount: 30,
      };
      const promoCodeDiscount = 10;
      const selectedAdditionalServices = [{}, {}, {}, {}, {}];
      const result = [15800, 0, 15800, 10, 14220, 0, 14220, 0, 14220];

      it('should be equal [15800, 0, 15800, 10, 14220, 0, 14220, 0, 14220]', () => {
        expect(calculateCostAndDiscounts({
          calculations,
          promoCodeDiscount,
          scootersCount,
          bookingType,
          dateTour,
          additionalServices,
          selectedAdditionalServices,
        })).toEqual(result);
      });
    });

    describe('return cost with promo-code discount and additional service', () => {
      const bookingType = 'partial';
      const scootersCount = 1;
      const dateTour = '2019-07-13T12:00:00+03:00';
      const calculations = {
        discountPrepayment: 10,
        discountPromotion: {
          value: 15,
          orderStartsAt,
          orderExpiresAt,
        },
        scooterPrice: 15800,
        earlyDiscountDayCount: 30,
      };
      const promoCodeDiscount = 10;
      const selectedAdditionalServices = [{}, { id: 2 }, { id: 3 }, {}, {}];

      const result = [15800, 0, 15800, 10, 14220, 0, 14220, 11000, 25220];

      it('should be equal [15800, 0, 15800, 10, 14220, 0, 14220, 11000, 25220]', () => {
        expect(calculateCostAndDiscounts({
          calculations,
          promoCodeDiscount,
          scootersCount,
          bookingType,
          dateTour,
          additionalServices,
          selectedAdditionalServices,
        })).toEqual(result);
      });
    });
  });

  describe('return cost without promo-code discount, if promotion is active', () => {
    const bookingType = 'partial';
    const scootersCount = 1;
    const dateTour = '2019-07-14T12:00:00+03:00';
    const calculations = {
      discountPrepayment: 10,
      discountPromotion: {
        value: 15,
        orderStartsAt,
        orderExpiresAt,
      },
      scooterPrice: 15800,
      earlyDiscountDayCount: 30,
    };
    const promoCodeDiscount = 10;
    const selectedAdditionalServices = [{}, {}, {}, {}, {}];
    const result = [15800, 15, 13430, 0, 13430, 0, 13430, 0, 13430];

    it('should be equal [15800, 15, 13430, 0, 13430, 0, 13430, 0, 13430]', () => {
      expect(calculateCostAndDiscounts({
        calculations,
        promoCodeDiscount,
        scootersCount,
        bookingType,
        dateTour,
        additionalServices,
        selectedAdditionalServices,
      })).toEqual(result);
    });
  });

  describe('calculation while updating', () => {
    describe('return cost while scooter count change', () => {
      const order = {
        totalPrice: 28440,
        status: 'waiting',
        permission: 'write_any_fields',
        dateTour: '2019-09-03T12:00:00+03:00',
        guestsCount: 3,
        scootersCount: 2,
        scooterPrice: 15800,
        additionalServicesCount: 5,
        additionalServices: [],
        communicationMethodsCount: 3,
        communicationMethods: [],
        discounts: [
          {
            type: 'prepayment',
            firstPrice: 31600,
            value: 10,
          },
        ],
      };

      const bookingType = 'full';
      const dateTour = moment().add(40, 'day');
      const calculations = {
        discountPrepayment: 10,
        scooterPrice: 15900,
        earlyDiscountDayCount: 30,
      };
      const selectedAdditionalServices = [{}, {}, {}, {}, {}];


      const resultDecrease = [15800, 0, 15800, 0, 15800, 10, 14220, 0, 14220];

      it('should be equal [15800, 0, 15800, 0, 15800, 10, 14220, 0, 14220]', () => {
        expect(calculateCostAndDiscounts({
          order,
          calculations,
          scootersCount: 1,
          bookingType,
          dateTour,
          additionalServices,
          selectedAdditionalServices,
        })).toEqual(resultDecrease);
      });

      const resultIncrease = [47700, 0, 47700, 0, 47700, 10, 42930, 0, 42930];

      it('should be equal [47700, 0, 47700, 0, 47700, 10, 42930, 0, 42930]', () => {
        expect(calculateCostAndDiscounts({
          order,
          calculations,
          scootersCount: 3,
          bookingType,
          dateTour,
          additionalServices,
          selectedAdditionalServices,
        })).toEqual(resultIncrease);
      });
    });

    describe('return cost with new promotion discount while date change', () => {
      const order = {
        totalPrice: 12879,
        status: 'waiting',
        permission: 'write_any_fields',
        dateTour: moment().add(32, 'day'),
        guestsCount: 2,
        scootersCount: 1,
        scooterPrice: 15900,
        additionalServicesCount: 5,
        additionalServices: [],
        communicationMethodsCount: 3,
        communicationMethods: [],
        discounts: [
          {
            type: 'prepayment',
            firstPrice: 14310,
            value: 10,
          },
          {
            type: 'promotion',
            firstPrice: 15900,
            value: 10,
          },
        ],
      };

      const bookingType = 'full';
      const calculations = {
        discountPrepayment: 10,
        discountPromotion: {
          value: 20,
          orderStartsAt: moment().add(10, 'day'),
          orderExpiresAt: moment().add(35, 'day'),
        },
        scooterPrice: 15900,
        dateTourCountDays: 3,
        orderBlockCountDays: 3,
        earlyDiscountDayCount: 30,
      };
      const selectedAdditionalServices = [{}, {}, {}, {}, {}];
      const resultWithoutChange = [15900, 10, 14310, 0, 14310, 10, 12879, 0, 12879];

      it('should be equal [15900, 10, 14310, 0, 14310, 10, 12879, 0, 12879]', () => {
        expect(calculateCostAndDiscounts({
          order,
          calculations,
          scootersCount: null,
          bookingType,
          dateTour: null,
          additionalServices,
          selectedAdditionalServices,
        })).toEqual(resultWithoutChange);
      });

      const dateTourWithPromotion = moment().add(33, 'day');
      const resultWithPromotionDiscount = [15900, 20, 12720, 0, 12720, 10, 11448, 0, 11448];

      it('should be equal [15900, 20, 12720, 0, 12720, 10, 11448, 0, 11448]', () => {
        expect(calculateCostAndDiscounts({
          order,
          calculations,
          scootersCount: order.scootersCount,
          bookingType,
          dateTour: dateTourWithPromotion,
          additionalServices,
          selectedAdditionalServices,
        })).toEqual(resultWithPromotionDiscount);
      });

      const dateTourWithoutPromotion = moment().add(40, 'day');
      const resultWithoutPromotionDiscount = [15900, 0, 15900, 0, 15900, 10, 14310, 0, 14310];

      it('should be equal [15900, 0, 15900, 0, 15900, 10, 14310, 0, 14310]', () => {
        expect(calculateCostAndDiscounts({
          order,
          calculations,
          scootersCount: order.scootersCount,
          bookingType,
          dateTour: dateTourWithoutPromotion,
          additionalServices,
          selectedAdditionalServices,
        })).toEqual(resultWithoutPromotionDiscount);
      });
    });

    describe('return cost while additional services price change', () => {
      const order = {
        totalPrice: 35000,
        status: 'waiting',
        permission: 'write_any_fields',
        dateTour: '2019-09-03T12:00:00+03:00',
        guestsCount: 3,
        scootersCount: 2,
        scooterPrice: 16000,
        additionalServicesCount: 5,
        additionalServices: [
          {
            id: 2,
            image: 'http://jetskipro.loc/services/Fy8HZwBBORtZaVmPq171.jpg',
            title: 'Nanny',
            price: 1000,
          },
          {
            id: 4,
            image: 'http://jetskipro.loc/services/qGnRfD0RtiH00XkoZWRW.jpg',
            title: 'Wakeboard',
            price: 2000,
          },
        ],
        communicationMethodsCount: 3,
        communicationMethods: [],
        discounts: [],
      };

      const additionalServices = [
        {
          id: 1,
          price: 1500,
          image: 'storage/services/s8SpvCQlh6bI4FMA441j.jpg',
          title: 'GoPro Camera',
          description: null,
        },
        {
          id: 2,
          price: 975,
          image: 'storage/services/0LeJrn6aw5YGVYgaYjlO.jpg',
          title: 'Nanny',
          description: null,
        },
        {
          id: 3,
          price: 11000,
          image: 'storage/services/bXTmgVsYx792FQJTiCiA.jpg',
          title: 'Accompanying boat',
          description: null,
        },
        {
          id: 4,
          price: 2150,
          image: 'storage/services/xIegKXzjOhIg9jl9s3yn.jpg',
          title: 'Wakeboard',
          description: null,
        },
        {
          id: 5,
          price: 3000,
          image: 'storage/services/yYxIQ2CmwY4XT0fOJyEv.jpg',
          title: 'JetSki Premium',
          description: null,
        },
      ];

      const bookingType = 'without';
      const dateTour = '2019-07-14T12:00:00+03:00';
      const calculations = {
        scooterPrice: 16000,
        earlyDiscountDayCount: 30,
      };

      const selectedAdditionalServicesIncludingAdded = [{}, { id: 2 }, { id: 3 }, { id: 4 }, {}];

      const resultForAdd = [32000, 0, 32000, 0, 32000, 0, 32000, 14000, 46000];

      it('should be equal [32000, 0, 32000, 0, 32000, 0, 32000, 14000, 46000]', () => {
        expect(calculateCostAndDiscounts({
          order,
          calculations,
          scootersCount: 2,
          bookingType,
          dateTour,
          additionalServices,
          selectedAdditionalServices: selectedAdditionalServicesIncludingAdded,
        })).toEqual(resultForAdd);
      });

      const selectedAdditionalServicesExcludingRemoves = [{}, {}, {}, { id: 4 }, {}];

      const resultForRemove = [32000, 0, 32000, 0, 32000, 0, 32000, 2000, 34000];

      it('should be equal [32000, 0, 32000, 0, 32000, 0, 32000, 2000, 34000]', () => {
        expect(calculateCostAndDiscounts({
          order,
          calculations,
          scootersCount: 2,
          bookingType,
          dateTour,
          additionalServices,
          selectedAdditionalServices: selectedAdditionalServicesExcludingRemoves,
        })).toEqual(resultForRemove);
      });
    });

    describe('return cost without new promotion discount if date is not changed', () => {
      const order = {
        totalPrice: 16000,
        status: 'waiting',
        permission: 'write_any_fields',
        dateTour: '2019-09-03T12:00:00+03:00',
        guestsCount: 2,
        scootersCount: 1,
        scooterPrice: 16000,
        additionalServicesCount: 5,
        additionalServices: [],
        communicationMethodsCount: 3,
        communicationMethods: [],
        discounts: [],
      };
      const bookingType = 'partial';
      const scootersCount = 2;
      const dateTour = '2019-09-03T12:00:00+03:00';
      const calculations = {
        discountPrepayment: 10,
        discountPromotion: {
          value: 15,
          orderStartsAt,
          orderExpiresAt,
        },
        scooterPrice: 16000,
        earlyDiscountDayCount: 30,
      };
      const selectedAdditionalServices = [{}, {}, {}, {}, {}];
      const result = [32000, 0, 32000, 0, 32000, 0, 32000, 0, 32000];

      it('should be equal [32000, 0, 32000, 0, 32000, 0, 32000, 0, 32000]', () => {
        expect(calculateCostAndDiscounts({
          order,
          calculations,
          scootersCount,
          bookingType,
          dateTour,
          additionalServices,
          selectedAdditionalServices,
        })).toEqual(result);
      });
    });

    describe('return cost with promo code discount from order', () => {
      const order = {
        totalPrice: 16000,
        status: 'waiting',
        permission: 'write_any_fields',
        dateTour: '2019-09-03T12:00:00+03:00',
        guestsCount: 2,
        scootersCount: 1,
        scooterPrice: 16000,
        additionalServicesCount: 5,
        additionalServices: [],
        communicationMethodsCount: 3,
        communicationMethods: [],
        discounts: [
          {
            type: 'promo_code_many',
            firstPrice: 16000,
            value: 5,
          },
        ],
      };
      const bookingType = 'partial';
      const scootersCount = 1;
      const dateTour = '2019-07-14T12:00:00+03:00';
      const calculations = {
        discountPrepayment: 10,
        scooterPrice: 16000,
        earlyDiscountDayCount: 30,
      };
      const selectedAdditionalServices = [{}, {}, {}, {}, {}];
      const result = [16000, 0, 16000, 5, 15200, 0, 15200, 0, 15200];

      it('should be equal [16000, 0, 16000, 5, 15200, 0, 15200, 0, 15200]', () => {
        expect(calculateCostAndDiscounts({
          order,
          calculations,
          scootersCount,
          bookingType,
          dateTour,
          additionalServices,
          selectedAdditionalServices,
        })).toEqual(result);
      });
    });
  });
});
