export interface ILiqPayData {
    /** Версія API. Поточне значення - 3 */
    version: number 

    /** Публічний ключ - ідентифікатор магазину. 
     * Отримати ключ можна в налаштуваннях магазин */
    public_key: number 	

    /** Тип операції. Можливі значення: 
     * pay - платіж, 
     * hold - блокування коштів на рахунку відправника, 
     * subscribe - регулярний платіж, 
     * paydonate - пожертв */
    action: "pay" | "hold" | "subscribe" | "paydonate" 	

    /** Сума платежу. Наприклад: 5, 7.34 */
    amount: number

    /** Валюта платежу. Можливі значення: USD, EUR, UAH */
    currency: "USD" | "EUR" | "UAH"

    /** Призначення платежу */
    description: string

    /** Унікальний ID покупки у Вашому магазині. 
     * Максимальна довжина 255 символів */
    order_id: string

    /** Час до якого клієнт може оплатити рахунок за UTC. 
     * Передається в форматі 2016-04-24 00:00:00 */
    expired_date?: string

    /** Мова клієнта uk, en */
    language?: "uk" | "en"

    /** Параметр в якому передаються способи оплати, 
     * які будуть відображені на чекауті. 
     * Можливі значення 
     * apay - оплата за допомогою Apple Pay, 
     * gpay - оплата за допомогою Google Pay, 
     * card - оплата карткою, 
     * privat24 - через кабінет приват24, 
     * moment_part - розстрочка, 
     * paypart - оплата частинами, 
     * cash - готівкою, 
     * invoice - рахунок на e-mail, 
     * qr - сканування qr-коду. 
     * Якщо параметр не переданий, то застосовуються налаштування магазину, 
     * вкладка Checkout */
    paytypes?: "apay" | "gpay" | "card" | "privat24" | "moment_part" | "paypart" | "cash" | "invoice" | "qr"

    /** URL у Вашому магазині 
     * на який покупця буде переадресовано після завершення покупки. 
     * Максимальна довжина 510 символів */
    result_url?: string

    /** URL API в Вашому магазині для повідомлень про зміну статусу платежу (сервер -> сервер).
     *  Максимальна довжина 510 символів. Детальніше */
    server_url?: string

    /** Можливе значення Y. Динамічний код верифікації, 
     * генерується і повертається в Callback. 
     * Так само згенерований код буде переданий в транзакції 
     * верифікації для відображення у виписці по картці клієнта. 
     * Працює для action = aut */
    verifycode?: string
}
