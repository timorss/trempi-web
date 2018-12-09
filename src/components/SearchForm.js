import React, { Component } from 'react';
import moment from 'moment';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
require('moment/locale/he');

export default class RouterContainer extends Component {
  render() {
    const {
      source,
      destination,
      date,
      clearField,
      clearAllFields,
      onChange,
      handleChangeDate } = this.props
    return (
      <form className="search-adv-form">
        <img src={require('../images/car4.png')} alt='car' className='big-car' />
        <p>
          <strong>סטודנטים, </strong>ניתן לחפש במוצא וביעד גם לפי מוסדות לימוד!
        </p>
        <div style={{}}>
          <label>מוצא:</label>
          <select
            id="src"
            style={{ width: 100 }}
            value={source}
            onChange={(event) => onChange(event, 'source')}>
            <option value="">בחר מוצא</option>
            <optgroup label="ישובים">
              <option value="אבן יהודה">אבן יהודה</option>
              <option value="אופקים">אופקים</option>
              <option value="אור יהודה">אור יהודה</option>
              <option value="אור עקיבא">אור עקיבא</option>
              <option value="אזור">אזור</option>
              <option value="אילת">אילת</option>
              <option value="אלעד">אלעד</option>
              <option value="אריאל">אריאל</option>
              <option value="אשדוד">אשדוד</option>
              <option value="אשקלון">אשקלון</option>
              <option value="באר טוביה">באר טוביה</option>
              <option value="באר שבע">באר שבע</option>
              <option value="בית דגן">בית דגן</option>
              <option value="בית חרות">בית חרות</option>
              <option value="בית שמש">בית שמש</option>
              <option value="ביתר עילת">ביתר עילת</option>
              <option value="בני ברק">בני ברק</option>
              <option value="בנימינה">בנימינה</option>
              <option value="בת ים">בת ים</option>
              <option value="גבעתיים">גבעתיים</option>
              <option value="גדרה">גדרה</option>
              <option value="דימונה">דימונה</option>
              <option value="דלית אל כרמל">דלית אל כרמל</option>
              <option value="הוד השרון">הוד השרון</option>
              <option value="הורדוס">הורדוס</option>
              <option value="הרצליה">הרצליה</option>
              <option value="ווינגייט">ווינגייט</option>
              <option value="זכרון יעקב">זכרון יעקב</option>
              <option value="חדרה">חדרה</option>
              <option value="חולון">חולון</option>
              <option value="חיפה">חיפה</option>
              <option value="חצור">חצור</option>
              <option value="טבריה">טבריה</option>
              <option value="טייבה">טייבה</option>
              <option value="טירת הכרמל">טירת הכרמל</option>
              <option value="טמרה">טמרה</option>
              <option value="יבנה">יבנה</option>
              <option value="יהוד">יהוד</option>
              <option value="יקנעם עלית">יקנעם עלית</option>
              <option value="ירוחם">ירוחם</option>
              <option value="ירושלים">ירושלים</option>
              <option value="ישוב גנות הדר">ישוב גנות הדר</option>
              <option value="ישוב חופית">ישוב חופית</option>
              <option value="כוכב יאיר">כוכב יאיר</option>
              <option value="ככר הבנים">ככר הבנים</option>
              <option value="כפר בילו">כפר בילו</option>
              <option value="כפר גיבתון">כפר גיבתון</option>
              <option value="כפר ויתקין">כפר ויתקין</option>
              <option value="כפר ורבורג">כפר ורבורג</option>
              <option value="כפר יונה">כפר יונה</option>
              <option value="כפר מלל">כפר מלל</option>
              <option value="כפר נטר">כפר נטר</option>
              <option value="כפר סבא">כפר סבא</option>
              <option value="כפר פינס">כפר פינס</option>
              <option value="כפר שמריהו">כפר שמריהו</option>
              <option value="כרמיאל">כרמיאל</option>
              <option value="לוד">לוד</option>
              <option value="מגאר">מגאר</option>
              <option value="מגדל העמק">מגדל העמק</option>
              <option value="מודיעין מכבים רעות">מודיעין מכבים רעות</option>
              <option value="מודיעין עילית">מודיעין עילית</option>
              <option value="מושב אביגדור">מושב אביגדור</option>
              <option value="מושב אודים">מושב אודים</option>
              <option value="מושב אורות">מושב אורות</option>
              <option value="מושב בית אהרון">מושב בית אהרון</option>
              <option value="מושב בית אלעזר">מושב בית אלעזר</option>
              <option value="מושב בית חרות">מושב בית חרות</option>
              <option value="מושב בית ינאי">מושב בית ינאי</option>
              <option value="מושב גן חיים">מושב גן חיים</option>
              <option value="מושב גנות">מושב גנות</option>
              <option value="מושב גני יוחנן">מושב גני יוחנן</option>
              <option value="מושב חבצלת השרון">מושב חבצלת השרון</option>
              <option value="מושב חמד">מושב חמד</option>
              <option value="מושב חן">מושב חן</option>
              <option value="מושב ירקונה">מושב ירקונה</option>
              <option value="מושב מכמורת">מושב מכמורת</option>
              <option value="מושב נוה ימין">מושב נוה ימין</option>
              <option value="מושב נורדיה">מושב נורדיה</option>
              <option value="מושב עדנים">מושב עדנים</option>
              <option value="מושב עין עירון">מושב עין עירון</option>
              <option value="מושב צופית">מושב צופית</option>
              <option value="מושב צורן">מושב צורן</option>
              <option value="מושב רמות השבים">מושב רמות השבים</option>
              <option value="מושב שדה ורבורג">מושב שדה ורבורג</option>
              <option value="מושב שער חפר">מושב שער חפר</option>
              <option value="מושב שפירא">מושב שפירא</option>
              <option value="מזכרת בתיה">מזכרת בתיה</option>
              <option value="מעלה אדומים">מעלה אדומים</option>
              <option value="מעלות">מעלות</option>
              <option value="מצפה רמון">מצפה רמון</option>
              <option value="משמר השבעה">משמר השבעה</option>
              <option value="נהריה">נהריה</option>
              <option value="נורדיה">נורדיה</option>
              <option value="נס ציונה">נס ציונה</option>
              <option value="נצרת">נצרת</option>
              <option value="נצרת עלית">נצרת עלית</option>
              <option value="נשר">נשר</option>
              <option value="נתיבות">נתיבות</option>
              <option value="נתניה">נתניה</option>
              <option value="סחנין">סחנין</option>
              <option value="עומר">עומר</option>
              <option value="עכו">עכו</option>
              <option value="עפולה">עפולה</option>
              <option value="ערד">ערד</option>
              <option value="פרדס חנה-כרכור">פרדס חנה-כרכור</option>
              <option value="פרדסיה">פרדסיה</option>
              <option value="פתח תקוה">פתח תקוה</option>
              <option value="צורן">צורן</option>
              <option value="צפת">צפת</option>
              <option value="קבוץ רמת הכובש">קבוץ רמת הכובש</option>
              <option value="קדימה">קדימה</option>
              <option value="קיבוץ כפר המכבי">קיבוץ כפר המכבי</option>
              <option value="קסריה">קסריה</option>
              <option value="קצרין">קצרין</option>
              <option value="קריית חיים">קריית חיים</option>
              <option value="קרית אונו">קרית אונו</option>
              <option value="קרית אתא">קרית אתא</option>
              <option value="קרית ביאליק">קרית ביאליק</option>
              <option value="קרית גת">קרית גת</option>
              <option value="קרית חיים">קרית חיים</option>
              <option value="קרית טבעון">קרית טבעון</option>
              <option value="קרית ים">קרית ים</option>
              <option value="קרית מוצקין">קרית מוצקין</option>
              <option value="קרית מלאכי">קרית מלאכי</option>
              <option value="קרית עקרון">קרית עקרון</option>
              <option value="קרית שמונה">קרית שמונה</option>
              <option value="ראש העין">ראש העין</option>
              <option value="ראש פינה">ראש פינה</option>
              <option value="ראשון לציון">ראשון לציון</option>
              <option value="רהט">רהט</option>
              <option value="רחובות">רחובות</option>
              <option value="רמלה">רמלה</option>
              <option value="רמת גן">רמת גן</option>
              <option value="רמת השרון">רמת השרון</option>
              <option value="רמת פנקס">רמת פנקס</option>
              <option value="רעננה">רעננה</option>
              <option value="רשפון">רשפון</option>
              <option value="שדרות">שדרות</option>
              <option value="שפרעם">שפרעם</option>
              <option value="תל אביב- יפו">תל אביב- יפו</option>
              <option value="תל מונד">תל מונד</option>
            </optgroup>

            <optgroup label="אוניברסטאות">
              <option value="בן-גוריון"> אונ' בן-גוריון </option>

              <option value="בר-אילן"> אונ' בר-אילן </option>

              <option value="אונ' חיפה"> אונ' חיפה </option>

              <option value="אונ' תל-אביב "> אונ' תל-אביב </option>

              <option value="האונ' העברית"> האונ' העברית בירושלים </option>

              <option value="האונ' הפתוחה"> האוניברסיטה הפתוחה </option>

              <option value="הטכניון"> הטכניון - מכון טכנולוגי לישראל </option>

              <option value="מכון ויצמן"> מכון ויצמן למדע </option>
            </optgroup>
            <optgroup label="מוסדות לא אוניברסיטאיים">
              <option value="אפקה"> אפקה - תל-אביב </option>

              <option value="...גבוה לטכנול..."> בי"ס גבוה לטכנולוגיה בירושלים </option>

              <option value="בצלאל"> בצלאל - אקדמיה לעיצוב ואומנות </option>

              <option value="מכ' אשקלון"> מכללת אשקלון </option>

              <option value="מכ' הדסה"> מכללת הדסה ירושלים </option>

              <option value="מכ' יהודה ושומרון"> מכללת יהודה ושומרון </option>

              <option value="מכ' כנרת"> מכללת כנרת בעמק הירדן </option>

              <option value="המכ' להנדסה אורט"> המכ' להנדסה אורט </option>

              <option value="המכ' להנדסה"> המכללה להנדסה בירושלים </option>

              <option value="סמי שמעון"> מכללת סמי שמעון </option>

              <option value="המכללה למשפטים"> המכ' למשפטים </option>

              <option value="מכללת נתניה"> מכללת נתניה </option>

              <option value="מכללת ספיר"> מכללת ספיר </option>

              <option value="מכ' עמק יזרעאל"> מכ' עמק יזרעאל </option>

              <option value="מכל' תא יפו"> מכללת תל-אביב יפו </option>

              <option value="מכ' תל חי"> מכללת תל חי </option>

              <option value="המרכז האקדמי פרס"> המרכז האקדמי פרס </option>

              <option value="רופין"> המרכז האקדמי רופין </option>

              <option value="הבינ' בהרצליה"> המרכז הבינתחומי בהרצליה </option>

              <option value="האק' קרית אונו"> הקריה האקדמית קרית אונו </option>

              <option value="טכנולוגי חולון"> מכון טכנולוגי חולון </option>

              <option value="מכון לנדר י-ם"> מכון לנדר ירושלים </option>

              <option value="מכון שכטר"> מכון שכטר למדעי היהדות </option>

              <option value="מכ' שערי משפט"> מכללת שערי משפט </option>

              <option value="שנקר"> שנקר - הנדסה ולעיצוב </option>
            </optgroup>
          </select>
          {source.length > 0 && <button type="button" className='clear-button'
            onClick={() => clearField('source')}
          >
            <img src={require('../images/cancel.png')} alt='cancel' style={{ width: 16, height: 16 }} />
          </button>}
        </div>
        <div>
          <label>יעד:</label>
          <select
            id="src"
            style={{ width: 100 }}
            value={destination}
            onChange={(event) => onChange(event, 'destination')}>
            <option value="">בחר יעד</option>
            <optgroup label="ישובים">
              <option value="אבן יהודה">אבן יהודה</option>
              <option value="אופקים">אופקים</option>
              <option value="אור יהודה">אור יהודה</option>
              <option value="אור עקיבא">אור עקיבא</option>
              <option value="אזור">אזור</option>
              <option value="אילת">אילת</option>
              <option value="אלעד">אלעד</option>
              <option value="אריאל">אריאל</option>
              <option value="אשדוד">אשדוד</option>
              <option value="אשקלון">אשקלון</option>
              <option value="באר טוביה">באר טוביה</option>
              <option value="באר שבע">באר שבע</option>
              <option value="בית דגן">בית דגן</option>
              <option value="בית חרות">בית חרות</option>
              <option value="בית שמש">בית שמש</option>
              <option value="ביתר עילת">ביתר עילת</option>
              <option value="בני ברק">בני ברק</option>
              <option value="בנימינה">בנימינה</option>
              <option value="בת ים">בת ים</option>
              <option value="גבעתיים">גבעתיים</option>
              <option value="גדרה">גדרה</option>
              <option value="דימונה">דימונה</option>
              <option value="דלית אל כרמל">דלית אל כרמל</option>
              <option value="הוד השרון">הוד השרון</option>
              <option value="הורדוס">הורדוס</option>
              <option value="הרצליה">הרצליה</option>
              <option value="ווינגייט">ווינגייט</option>
              <option value="זכרון יעקב">זכרון יעקב</option>
              <option value="חדרה">חדרה</option>
              <option value="חולון">חולון</option>
              <option value="חיפה">חיפה</option>
              <option value="חצור">חצור</option>
              <option value="טבריה">טבריה</option>
              <option value="טייבה">טייבה</option>
              <option value="טירת הכרמל">טירת הכרמל</option>
              <option value="טמרה">טמרה</option>
              <option value="יבנה">יבנה</option>
              <option value="יהוד">יהוד</option>
              <option value="יקנעם עלית">יקנעם עלית</option>
              <option value="ירוחם">ירוחם</option>
              <option value="ירושלים">ירושלים</option>
              <option value="ישוב גנות הדר">ישוב גנות הדר</option>
              <option value="ישוב חופית">ישוב חופית</option>
              <option value="כוכב יאיר">כוכב יאיר</option>
              <option value="ככר הבנים">ככר הבנים</option>
              <option value="כפר בילו">כפר בילו</option>
              <option value="כפר גיבתון">כפר גיבתון</option>
              <option value="כפר ויתקין">כפר ויתקין</option>
              <option value="כפר ורבורג">כפר ורבורג</option>
              <option value="כפר יונה">כפר יונה</option>
              <option value="כפר מלל">כפר מלל</option>
              <option value="כפר נטר">כפר נטר</option>
              <option value="כפר סבא">כפר סבא</option>
              <option value="כפר פינס">כפר פינס</option>
              <option value="כפר שמריהו">כפר שמריהו</option>
              <option value="כרמיאל">כרמיאל</option>
              <option value="לוד">לוד</option>
              <option value="מגאר">מגאר</option>
              <option value="מגדל העמק">מגדל העמק</option>
              <option value="מודיעין מכבים רעות">מודיעין מכבים רעות</option>
              <option value="מודיעין עילית">מודיעין עילית</option>
              <option value="מושב אביגדור">מושב אביגדור</option>
              <option value="מושב אודים">מושב אודים</option>
              <option value="מושב אורות">מושב אורות</option>
              <option value="מושב בית אהרון">מושב בית אהרון</option>
              <option value="מושב בית אלעזר">מושב בית אלעזר</option>
              <option value="מושב בית חרות">מושב בית חרות</option>
              <option value="מושב בית ינאי">מושב בית ינאי</option>
              <option value="מושב גן חיים">מושב גן חיים</option>
              <option value="מושב גנות">מושב גנות</option>
              <option value="מושב גני יוחנן">מושב גני יוחנן</option>
              <option value="מושב חבצלת השרון">מושב חבצלת השרון</option>
              <option value="מושב חמד">מושב חמד</option>
              <option value="מושב חן">מושב חן</option>
              <option value="מושב ירקונה">מושב ירקונה</option>
              <option value="מושב מכמורת">מושב מכמורת</option>
              <option value="מושב נוה ימין">מושב נוה ימין</option>
              <option value="מושב נורדיה">מושב נורדיה</option>
              <option value="מושב עדנים">מושב עדנים</option>
              <option value="מושב עין עירון">מושב עין עירון</option>
              <option value="מושב צופית">מושב צופית</option>
              <option value="מושב צורן">מושב צורן</option>
              <option value="מושב רמות השבים">מושב רמות השבים</option>
              <option value="מושב שדה ורבורג">מושב שדה ורבורג</option>
              <option value="מושב שער חפר">מושב שער חפר</option>
              <option value="מושב שפירא">מושב שפירא</option>
              <option value="מזכרת בתיה">מזכרת בתיה</option>
              <option value="מעלה אדומים">מעלה אדומים</option>
              <option value="מעלות">מעלות</option>
              <option value="מצפה רמון">מצפה רמון</option>
              <option value="משמר השבעה">משמר השבעה</option>
              <option value="נהריה">נהריה</option>
              <option value="נורדיה">נורדיה</option>
              <option value="נס ציונה">נס ציונה</option>
              <option value="נצרת">נצרת</option>
              <option value="נצרת עלית">נצרת עלית</option>
              <option value="נשר">נשר</option>
              <option value="נתיבות">נתיבות</option>
              <option value="נתניה">נתניה</option>
              <option value="סחנין">סחנין</option>
              <option value="עומר">עומר</option>
              <option value="עכו">עכו</option>
              <option value="עפולה">עפולה</option>
              <option value="ערד">ערד</option>
              <option value="פרדס חנה-כרכור">פרדס חנה-כרכור</option>
              <option value="פרדסיה">פרדסיה</option>
              <option value="פתח תקוה">פתח תקוה</option>
              <option value="צורן">צורן</option>
              <option value="צפת">צפת</option>
              <option value="קבוץ רמת הכובש">קבוץ רמת הכובש</option>
              <option value="קדימה">קדימה</option>
              <option value="קיבוץ כפר המכבי">קיבוץ כפר המכבי</option>
              <option value="קסריה">קסריה</option>
              <option value="קצרין">קצרין</option>
              <option value="קריית חיים">קריית חיים</option>
              <option value="קרית אונו">קרית אונו</option>
              <option value="קרית אתא">קרית אתא</option>
              <option value="קרית ביאליק">קרית ביאליק</option>
              <option value="קרית גת">קרית גת</option>
              <option value="קרית חיים">קרית חיים</option>
              <option value="קרית טבעון">קרית טבעון</option>
              <option value="קרית ים">קרית ים</option>
              <option value="קרית מוצקין">קרית מוצקין</option>
              <option value="קרית מלאכי">קרית מלאכי</option>
              <option value="קרית עקרון">קרית עקרון</option>
              <option value="קרית שמונה">קרית שמונה</option>
              <option value="ראש העין">ראש העין</option>
              <option value="ראש פינה">ראש פינה</option>
              <option value="ראשון לציון">ראשון לציון</option>
              <option value="רהט">רהט</option>
              <option value="רחובות">רחובות</option>
              <option value="רמלה">רמלה</option>
              <option value="רמת גן">רמת גן</option>
              <option value="רמת השרון">רמת השרון</option>
              <option value="רמת פנקס">רמת פנקס</option>
              <option value="רעננה">רעננה</option>
              <option value="רשפון">רשפון</option>
              <option value="שדרות">שדרות</option>
              <option value="שפרעם">שפרעם</option>
              <option value="תל אביב- יפו">תל אביב- יפו</option>
              <option value="תל מונד">תל מונד</option>
            </optgroup>

            <optgroup label="אוניברסטאות">
              <option value="בן-גוריון"> אונ' בן-גוריון </option>

              <option value="בר-אילן"> אונ' בר-אילן </option>

              <option value="אונ' חיפה"> אונ' חיפה </option>

              <option value="אונ' תל-אביב "> אונ' תל-אביב </option>

              <option value="האונ' העברית"> האונ' העברית בירושלים </option>

              <option value="האונ' הפתוחה"> האוניברסיטה הפתוחה </option>

              <option value="הטכניון"> הטכניון - מכון טכנולוגי לישראל </option>

              <option value="מכון ויצמן"> מכון ויצמן למדע </option>
            </optgroup>
            <optgroup label="מוסדות לא אוניברסיטאיים">
              <option value="אפקה"> אפקה - תל-אביב </option>

              <option value="...גבוה לטכנול..."> בי"ס גבוה לטכנולוגיה בירושלים </option>

              <option value="בצלאל"> בצלאל - אקדמיה לעיצוב ואומנות </option>

              <option value="מכ' אשקלון"> מכללת אשקלון </option>

              <option value="מכ' הדסה"> מכללת הדסה ירושלים </option>

              <option value="מכ' יהודה ושומרון"> מכללת יהודה ושומרון </option>

              <option value="מכ' כנרת"> מכללת כנרת בעמק הירדן </option>

              <option value="המכ' להנדסה אורט"> המכ' להנדסה אורט </option>

              <option value="המכ' להנדסה"> המכללה להנדסה בירושלים </option>

              <option value="סמי שמעון"> מכללת סמי שמעון </option>

              <option value="המכללה למשפטים"> המכ' למשפטים </option>

              <option value="מכללת נתניה"> מכללת נתניה </option>

              <option value="מכללת ספיר"> מכללת ספיר </option>

              <option value="מכ' עמק יזרעאל"> מכ' עמק יזרעאל </option>

              <option value="מכל' תא יפו"> מכללת תל-אביב יפו </option>

              <option value="מכ' תל חי"> מכללת תל חי </option>

              <option value="המרכז האקדמי פרס"> המרכז האקדמי פרס </option>

              <option value="רופין"> המרכז האקדמי רופין </option>

              <option value="הבינ' בהרצליה"> המרכז הבינתחומי בהרצליה </option>

              <option value="האק' קרית אונו"> הקריה האקדמית קרית אונו </option>

              <option value="טכנולוגי חולון"> מכון טכנולוגי חולון </option>

              <option value="מכון לנדר י-ם"> מכון לנדר ירושלים </option>

              <option value="מכון שכטר"> מכון שכטר למדעי היהדות </option>

              <option value="מכ' שערי משפט"> מכללת שערי משפט </option>

              <option value="שנקר"> שנקר - הנדסה ולעיצוב </option>
            </optgroup>
          </select>
          {destination.length > 0 && <button type="button" className='clear-button'
            onClick={() => clearField('destination')}
          >
            <img src={require('../images/cancel.png')} alt='cancel' style={{ width: 16, height: 16 }} />
          </button>}
        </div>

        <div className="date-time">
          <label>תאריך:</label>
          <DatePicker
            locale={'He'}
            selected={date}
            onChange={handleChangeDate}
            dateFormat="DD/MM"
            placeholderText="תאריך"
            minDate={moment()}
          />
          {typeof date === 'object' && <button type="button" className='clear-button'
            onClick={() => clearField('date')}
          >
            <img src={require('../images/cancel.png')} alt='cancel' style={{ width: 16, height: 16 }} />
          </button>}

        </div>
        {/* <div className="date-time"> */}
        <button type="button" className='clear-all-Fields'
          onClick={clearAllFields}
        >
          <div className='clear-all-Fields-text'>נקה שדות</div>
        </button>

        {/* </div> */}

      </form>
    )
  }
}




