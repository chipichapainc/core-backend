import { ILiqPayData } from "./liqpay-data.interface";

// TODO: adjust types & validate
export interface ILiqPayCallback {
    acq_id //	Number	ID еквайера	
    action //	String	Тип операції. Можливі значення: pay - платіж, hold - блокування коштів на рахунку відправника, paysplit - розщеплення платежу, subscribe - створення регулярного платежу, auth - предавторизація картки, regular - регулярний платіж	
    agent_commission //	Number	Комісія агента в валюті платежу	
    amount //	Number	Сума платежу	
    amount_bonus //	Number	Бонус відправника у валюті платежу debit	
    amount_credit //	Number	Сума транзакції credit в валюті currency_credit	
    amount_debit //	Number	Сума транзакції debit у валюті currency_debit	
    authcode_credit //	String	Код авторизації по транзакції credit	
    authcode_debit //	String	Код авторизації по транзакції debit	
    card_token //	String	Token картки відправника	
    commission_credit //	Number	Комісія з одержувача у валюті currency_credit	
    commission_debit //	Number	Комісія з відправника у валюті currency_debit	
    completion_date //	String	Дата списання коштів	
    create_date //	String	Дата створення платежу	
    currency //	String	Валюта платежу	
    currency_credit //	String	Валюта транзакції credit	
    currency_debit //	String	Валюта транзакції debit	
    customer //	String	Унікальний ідентифікатор користувача на сайті мерчанта. Максимальна довжина 100 символів.	
    description //	String	Коментар до платежу	
    end_date //	String	Дата завершення/зміни платежу	
    err_code //	String	Код помилки	
    err_description //	String	Опис помилки	
    info //	String	Додаткова інформація про платіж	
    ip //	String	IP адреса відправника	
    is_3ds //	Boolean	Можливі значення: true - транзакція пройшла з 3DS перевіркою, false - транзакція пройшла без 3DS перевірки	
    liqpay_order_id //	String	Order_id платежу в системі LiqPay	
    mpi_eci //	Number	Можливі значення: 5 - транзакція пройшла з 3DS (емітент і еквайєр підтримують технологію 3D-Secure), 6 - емітент картки платника не підтримує технологію 3D-Secure, 7 - операція пройшла без 3D-Secure	
    order_id //	String	Order_id платежу.	
    payment_id //	Number	Id платежу в системі LiqPay	
    paytype //	String	Спосіб оплати. Можливі значення card - оплата картою, privat24 - через кабінет Приват24, masterpass - через кабінет masterpass, moment_part - розстрочка, cash - готівкою, invoice - рахунок на e-mail, qr - сканування qr-коду	
    public_key //	String	Публічний ключ магазину	
    receiver_commission //	Number	Комісія з одержувача у валюті платежу	
    redirect_to //	String	Посилання на яке необхідно перенаправляти клієнта для проходження 3DS верифікації	
    refund_date_last //	String	Дата останнього повернення по платежу	
    rrn_credit //	String	Унікальний номер транзакції в системі авторизації і розрахунків обслуговуючого банку Retrieval Reference number	
    rrn_debit //	String	Унікальний номер транзакції в системі авторизації і розрахунків обслуговуючого банку Retrieval Reference number	
    sender_bonus //	Number	Бонус відправника у валюті платежу	
    sender_card_bank //	String	Банк відправника	
    sender_card_country //	String	Країна картки відправника. Цифровий ISO 3166-1 код	
    sender_card_mask2 //	String	Карта відправника	
    sender_card_type //	String	Тип картки відправника MC/Visa	
    sender_commission //	Number	Комісія з відправника у валюті платежу	
    sender_first_name //	String	Ім'я відправника	
    sender_last_name //	String	Прізвище відправника	
    sender_phone //	String	Телефон відправника	
    status //	String	Статус платежу.
    /* Можливі значення:
    Кінцеві статуси платежу
    error - Неуспішний платіж. Некоректно заповнені дані
    failure - Неуспішний платіж
    reversed - Платіж повернений
    subscribed - Підписка успішно оформлена
    success - Успішний платіж
    unsubscribed - Підписка успішно деактивована
    Статуси що потребують підтвердження платежу
    3ds_verify - Потрібна 3DS верифікація. Для завершення платежу, потрібно виконати 3ds_verify
    captcha_verify - Очікується підтвердження captcha
    cvv_verify - Потрібне введення CVV картки відправника. Для завершення платежу, потрібно виконати cvv_verify
    ivr_verify - Очікується підтвердження дзвінком ivr
    otp_verify - Потрібне OTP підтвердження клієнта. OTP пароль відправлений на номер телефону Клієнта. Для завершення платежу, потрібно виконати otp_verify
    password_verify - Очікується підтвердження пароля додатка Приват24
    phone_verify - Очікується введення телефону клієнтом. Для завершення платежу, потрібно виконати phone_verify
    pin_verify - Очікується підтвердження pin-code
    receiver_verify - Потрібне введення даних одержувача. Для завершення платежу, потрібно виконати receiver_verify
    sender_verify - Потрібне введення даних відправника. Для завершення платежу, потрібно виконати sender_verify
    senderapp_verify - Очікується підтвердження в додатку Privat24
    wait_qr - Очікується сканування QR-коду клієнтом
    wait_sender - Очікується підтвердження оплати клієнтом в додатку Privat24/SENDER
    Інші статуси платежу
    cash_wait - Очікується оплата готівкою в ТСО
    hold_wait - Сума успішно заблокована на рахунку відправника
    invoice_wait - Інвойс створений успішно, очікується оплата
    prepared - Платіж створений, очікується його завершення відправником
    processing - Платіж обробляється
    wait_accept - Кошти з клієнта списані, але магазин ще не пройшов перевірку. Якщо магазин не пройде активацію протягом 60 днів, платежі будуть автоматично скасовані
    wait_card - Не встановлений спосіб відшкодування у одержувача
    wait_compensation - Платіж успішний, буде зарахований в щодобовій проводці
    wait_lc - Акредитив. Кошти з клієнта списані, очікується підтвердження доставки товару
    wait_reserve - Грошові кошти за платежем зарезервовані для проведення повернення за раніше поданою заявкою
    wait_secure - Платіж на перевірці
    */
    wait_reserve_status //	String	Додатковий статус платежу, який говорить про те, що поточний платіж зарезервовано для виконання повернення по вашому магазину. Можливі значення: true - платіж зарезервовано для виконання повернення	
    token //	String	Token платежу	
    type //	String	Тип платежу	
    version //	Number	Версія API. Поточне значення - 3	
    err_erc //	String	Код помилки	
    product_category //	String	Категорія товару	
    product_description //	String	Опис товару	
    product_name //	String	Назва товару	
    product_url //	String	Адреса сторінки з товаром	
    refund_amount //	Number	Сума повернення	
    verifycode //	String	Код верифікації
}