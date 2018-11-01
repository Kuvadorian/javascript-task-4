'use strict';

/**
 * Сделано задание на звездочку
 * Реализованы методы several и through
 */
const isStar = false;

/**
 * Возвращает новый emitter
 * @returns {Object}
 */
function getEmitter() {
    let eventHandlers = [];

    function getOff(event) {
        return Object.keys(eventHandlers).filter(eventName => eventName === event ||
        eventName.startsWith(event + '.'));
    }

    function getEmit(event) {
        return Object.keys(eventHandlers).filter(eventName => eventName === event ||
        event.startsWith(eventName + '.'))
            .reverse();
    }

    return {

        /**
         * Подписаться на событие
         * @param {String} event
         * @param {Object} context
         * @param {Function} handler
         * @returns {Object}
         */
        on: function (event, context, handler) {
            if (!eventHandlers[event]) {
                eventHandlers[event] = [];
            }
            eventHandlers[event].push({ context, handler });

            return this;
        },

        /**
         * Отписаться от события
         * @param {String} event
         * @param {Object} context
         * @returns {Object}
         */
        off: function (event, context) {
            let eventCleaner = getOff(event);
            for (let eventName of eventCleaner) {
                eventHandlers[eventName] = eventHandlers[eventName].filter(element => {
                    return element.context !== context;
                });
            }

            return this;
        },

        /**
         * Уведомить о событии
         * @param {String} event
         * @returns {Object}
         */
        emit: function (event) {
            let eventReporter = getEmit(event);
            console.info(event);
            console.info(eventReporter);
            eventReporter.forEach(element => {
                if (eventHandlers[element]) {
                    eventHandlers[element].forEach(element2 => {
                        element2.handler.call(element2.context);
                    });
                }
                console.info('wow');
                console.info(eventHandlers.begin[0]);
            });

            return this;


            /* for (let element of Object.values(eventHandlers[event])) {
                element.handler.call(element.context);
            }*/
        }

        /**
         * Подписаться на событие с ограничением по количеству полученных уведомлений
         * @star
         * @param {String} event
         * @param {Object} context
         * @param {Function} handler
         * @param {Number} times – сколько раз получить уведомление
         */
        /* several: function (event, context, handler, times) {
            console.info(event, context, handler, times);
        },

        /**
         * Подписаться на событие с ограничением по частоте получения уведомлений
         * @star
         * @param {String} event
         * @param {Object} context
         * @param {Function} handler
         * @param {Number} frequency – как часто уведомлять
         */
        /* through: function (event, context, handler, frequency) {
            console.info(event, context, handler, frequency);
        }*/
    };
}

module.exports = {
    getEmitter,

    isStar
};
