##### Front-end Developer

```dotenv
Description
Permission settings below to set the level of access for each team member.

Принцип роботи: 

По замовчуванню всі чекбокси в стані. Page 1. Активні тільки view, далі всі чекбокси в статусі disabled.
Коли вибираєш view конкретної категорії, чекбокси блоку edit стають активними. Аналогічно edit та remove. 
Коли вибрані всі чекбокси одної колонки, чекбокс check all, має бути активним
При зберіганні всі дані, зберігаються в LocalStorage. Формат [{ "section": "calendar", "permission": { "view": "true", "edit": "true", "remove": "false" }, {}, {}]
```
