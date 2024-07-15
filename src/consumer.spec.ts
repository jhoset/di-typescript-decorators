import {Consumer, TimeService} from "./consumer";
import { containerInstance } from "./container";

describe('Consumer', () => {
    let consumer: Consumer;
    let timeServiceMock: TimeService;

    beforeEach(() => {
        timeServiceMock = { getCurrentDate: jest.fn() };
        (timeServiceMock.getCurrentDate as jest.Mock).mockReturnValue(new Date('2020-12-08'));

        containerInstance.provide({
            token: 'timeService',
            useValue: timeServiceMock
        });

        consumer = new Consumer();
    });

    it('should fetch the date', () => {
        expect(timeServiceMock.getCurrentDate).toHaveBeenCalledWith();
    });

    it('should set the date', () => {
        expect(consumer.currentDate).toBe('2020-12-08T00:00:00.000Z');
    });
});
