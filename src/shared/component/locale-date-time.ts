/**
 * PRIMENG
 * Following options can be a part of the format.

 d - day of month (no leading zero)
 dd - day of month (two digit)
 o - day of the year (no leading zeros)
 oo - day of the year (three digit)
 D - day name short
 DD - day name long
 m - month of year (no leading zero)
 mm - month of year (two digit)
 M - month name short
 MM - month name long
 y - year (two digit)
 yy - year (four digit)
 @ - Unix timestamp (ms since 01/01/1970)
 ! - Windows ticks (100ns since 01/01/0001)
 '...' - literal text
 '' - single quote
 anything else - literal text


 *
 *  MOMENT
 *  https://momentjs.com/docs/#/parsing/string-format/
 *
 <table>
 <tr>
 <th>Input</th>
 <th>Example</th>
 <th>Description</th>
 </tr>
 <tr>
 <td><code>YYYY</code></td>
 <td><code>2014</code></td>
 <td>4 or 2 digit year</td>
 </tr>
 <tr>
 <td><code>YY</code></td>
 <td><code>14</code></td>
 <td>2 digit year</td>
 </tr>
 <tr>
 <td><code>Y</code></td>
 <td><code>-25</code></td>
 <td>Year with any number of digits and sign</td>
 </tr>
 <tr>
 <td><code>Q</code></td>
 <td><code>1..4</code></td>
 <td>Quarter of year. Sets month to first month in quarter.</td>
 </tr>
 <tr>
 <td><code>M MM</code></td>
 <td><code>1..12</code></td>
 <td>Month number</td>
 </tr>
 <tr>
 <td><code>MMM MMMM</code></td>
 <td><code>Jan..December</code></td>
 <td>Month name in locale set by <code>moment.locale()</code></td>
 </tr>
 <tr>
 <td><code>D DD</code></td>
 <td><code>1..31</code></td>
 <td>Day of month</td>
 </tr>
 <tr>
 <td><code>Do</code></td>
 <td><code>1st..31st</code></td>
 <td>Day of month with ordinal</td>
 </tr>
 <tr>
 <td><code>DDD DDDD</code></td>
 <td><code>1..365</code></td>
 <td>Day of year</td>
 </tr>
 <tr>
 <td><code>X</code></td>
 <td><code>1410715640.579</code></td>
 <td>Unix timestamp</td>
 </tr>
 <tr>
 <td><code>x</code></td>
 <td><code>1410715640579</code></td>
 <td>Unix ms timestamp</td>
 </tr>
 </table>

 <table>
 <tr>
 <th>Input</th>
 <th>Example</th>
 <th>Description</th>
 </tr>
 <tr>
 <td><code>gggg</code></td>
 <td><code>2014</code></td>
 <td>Locale 4 digit week year</td>
 </tr>
 <tr>
 <td><code>gg</code></td>
 <td><code>14</code></td>
 <td>Locale 2 digit week year</td>
 </tr>
 <tr>
 <td><code>w ww</code></td>
 <td><code>1..53</code></td>
 <td>Locale week of year</td>
 </tr>
 <tr>
 <td><code>e</code></td>
 <td><code>0..6</code></td>
 <td>Locale day of week</td>
 </tr>
 <tr>
 <td><code>ddd dddd</code></td>
 <td><code>Mon...Sunday</code></td>
 <td>Day name in locale set by <code>moment.locale()</code></td>
 </tr>
 <tr>
 <td><code>GGGG</code></td>
 <td><code>2014</code></td>
 <td>ISO 4 digit week year</td>
 </tr>
 <tr>
 <td><code>GG</code></td>
 <td><code>14</code></td>
 <td>ISO 2 digit week year</td>
 </tr>
 <tr>
 <td><code>W WW</code></td>
 <td><code>1..53</code></td>
 <td>ISO week of year</td>
 </tr>
 <tr>
 <td><code>E</code></td>
 <td><code>1..7</code></td>
 <td>ISO day of week</td>
 </tr>
 </table>

 <table>
 <tr>
 <th>Input</th>
 <th>Example</th>
 <th>Description</th>
 </tr>
 <tr>
 <td><code>H HH</code></td>
 <td><code>0..23</code></td>
 <td>Hours (24 hour time)</td>
 </tr>
 <tr>
 <td><code>h hh</code></td>
 <td><code>1..12</code></td>
 <td>Hours (12 hour time used with <code>a A</code>.)</td>
 </tr>
 <tr>
 <td><code>k kk</code></td>
 <td><code>1..24</code></td>
 <td>Hours (24 hour time from 1 to 24)</td>
 </tr>
 <tr>
 <td><code>a A</code></td>
 <td><code>am pm</code></td>
 <td>Post or ante meridiem (Note the one character <code>a p</code> are also considered valid)</td>
 </tr>
 <tr>
 <td><code>m mm</code></td>
 <td><code>0..59</code></td>
 <td>Minutes</td>
 </tr>
 <tr>
 <td><code>s ss</code></td>
 <td><code>0..59</code></td>
 <td>Seconds</td>
 </tr>
 <tr>
 <td><code>S SS SSS</code></td>
 <td><code>0..999</code></td>
 <td>Fractional seconds</td>
 </tr>
 <tr>
 <td><code>Z ZZ</code></td>
 <td><code>+12:00</code></td>
 <td>Offset from UTC as <code>+-HH:mm</code>, <code>+-HHmm</code>, or <code>Z</code></td>
 </tr>
 </table>

 ANGULAR
 https://angular.io/api/common/DatePipe

 <table>
 <tr>
 <th>Field Type</th>
 <th>Format</th>
 <th>Description</th>
 <th>Example Value</th>
 </tr>
 <tr>
 <td>Era</td>
 <td>G, GG &amp; GGG</td>
 <td>Abbreviated</td>
 <td>AD</td>
 </tr>
 <tr>
 <td></td>
 <td>GGGG</td>
 <td>Wide</td>
 <td>Anno Domini</td>
 </tr>
 <tr>
 <td></td>
 <td>GGGGG</td>
 <td>Narrow</td>
 <td>A</td>
 </tr>
 <tr>
 <td>Year</td>
 <td>y</td>
 <td>Numeric: minimum digits</td>
 <td>2, 20, 201, 2017, 20173</td>
 </tr>
 <tr>
 <td></td>
 <td>yy</td>
 <td>Numeric: 2 digits + zero padded</td>
 <td>02, 20, 01, 17, 73</td>
 </tr>
 <tr>
 <td></td>
 <td>yyy</td>
 <td>Numeric: 3 digits + zero padded</td>
 <td>002, 020, 201, 2017, 20173</td>
 </tr>
 <tr>
 <td></td>
 <td>yyyy</td>
 <td>Numeric: 4 digits or more + zero padded</td>
 <td>0002, 0020, 0201, 2017, 20173</td>
 </tr>
 <tr>
 <td>Month</td>
 <td>M</td>
 <td>Numeric: 1 digit</td>
 <td>9, 12</td>
 </tr>
 <tr>
 <td></td>
 <td>MM</td>
 <td>Numeric: 2 digits + zero padded</td>
 <td>09, 12</td>
 </tr>
 <tr>
 <td></td>
 <td>MMM</td>
 <td>Abbreviated</td>
 <td>Sep</td>
 </tr>
 <tr>
 <td></td>
 <td>MMMM</td>
 <td>Wide</td>
 <td>September</td>
 </tr>
 <tr>
 <td></td>
 <td>MMMMM</td>
 <td>Narrow</td>
 <td>S</td>
 </tr>
 <tr>
 <td>Month standalone</td>
 <td>L</td>
 <td>Numeric: 1 digit</td>
 <td>9, 12</td>
 </tr>
 <tr>
 <td></td>
 <td>LL</td>
 <td>Numeric: 2 digits + zero padded</td>
 <td>09, 12</td>
 </tr>
 <tr>
 <td></td>
 <td>LLL</td>
 <td>Abbreviated</td>
 <td>Sep</td>
 </tr>
 <tr>
 <td></td>
 <td>LLLL</td>
 <td>Wide</td>
 <td>September</td>
 </tr>
 <tr>
 <td></td>
 <td>LLLLL</td>
 <td>Narrow</td>
 <td>S</td>
 </tr>
 <tr>
 <td>Week of year</td>
 <td>w</td>
 <td>Numeric: minimum digits</td>
 <td>1... 53</td>
 </tr>
 <tr>
 <td></td>
 <td>ww</td>
 <td>Numeric: 2 digits + zero padded</td>
 <td>01... 53</td>
 </tr>
 <tr>
 <td>Week of month</td>
 <td>W</td>
 <td>Numeric: 1 digit</td>
 <td>1... 5</td>
 </tr>
 <tr>
 <td>Day of month</td>
 <td>d</td>
 <td>Numeric: minimum digits</td>
 <td>1</td>
 </tr>
 <tr>
 <td></td>
 <td>dd</td>
 <td>Numeric: 2 digits + zero padded</td>
 <td>01</td>
 </tr>
 <tr>
 <td>Week day</td>
 <td>E, EE &amp; EEE</td>
 <td>Abbreviated</td>
 <td>Tue</td>
 </tr>
 <tr>
 <td></td>
 <td>EEEE</td>
 <td>Wide</td>
 <td>Tuesday</td>
 </tr>
 <tr>
 <td></td>
 <td>EEEEE</td>
 <td>Narrow</td>
 <td>T</td>
 </tr>
 <tr>
 <td></td>
 <td>EEEEEE</td>
 <td>Short</td>
 <td>Tu</td>
 </tr>
 <tr>
 <td>Period</td>
 <td>a, aa &amp; aaa</td>
 <td>Abbreviated</td>
 <td>am/pm or AM/PM</td>
 </tr>
 <tr>
 <td></td>
 <td>aaaa</td>
 <td>Wide (fallback to
 <code><a href="api/router/RouterLinkWithHref" class="code-anchor">a</a></code>
 when missing)</td>
 <td>ante meridiem/post meridiem</td>
 </tr>
 <tr>
 <td></td>
 <td>aaaaa</td>
 <td>Narrow</td>
 <td>a/p</td>
 </tr>
 <tr>
 <td>Period*</td>
 <td>B, BB &amp; BBB</td>
 <td>Abbreviated</td>
 <td>mid.</td>
 </tr>
 <tr>
 <td></td>
 <td>BBBB</td>
 <td>Wide</td>
 <td>am, pm, midnight, noon, morning, afternoon, evening, night</td>
 </tr>
 <tr>
 <td></td>
 <td>BBBBB</td>
 <td>Narrow</td>
 <td>md</td>
 </tr>
 <tr>
 <td>Period standalone*</td>
 <td>b, bb &amp; bbb</td>
 <td>Abbreviated</td>
 <td>mid.</td>
 </tr>
 <tr>
 <td></td>
 <td>bbbb</td>
 <td>Wide</td>
 <td>am, pm, midnight, noon, morning, afternoon, evening, night</td>
 </tr>
 <tr>
 <td></td>
 <td>bbbbb</td>
 <td>Narrow</td>
 <td>md</td>
 </tr>
 <tr>
 <td>Hour 1-12</td>
 <td>h</td>
 <td>Numeric: minimum digits</td>
 <td>1, 12</td>
 </tr>
 <tr>
 <td></td>
 <td>hh</td>
 <td>Numeric: 2 digits + zero padded</td>
 <td>01, 12</td>
 </tr>
 <tr>
 <td>Hour 0-23</td>
 <td>H</td>
 <td>Numeric: minimum digits</td>
 <td>0, 23</td>
 </tr>
 <tr>
 <td></td>
 <td>HH</td>
 <td>Numeric: 2 digits + zero padded</td>
 <td>00, 23</td>
 </tr>
 <tr>
 <td>Minute</td>
 <td>m</td>
 <td>Numeric: minimum digits</td>
 <td>8, 59</td>
 </tr>
 <tr>
 <td></td>
 <td>mm</td>
 <td>Numeric: 2 digits + zero padded</td>
 <td>08, 59</td>
 </tr>
 <tr>
 <td>Second</td>
 <td>s</td>
 <td>Numeric: minimum digits</td>
 <td>0... 59</td>
 </tr>
 <tr>
 <td></td>
 <td>ss</td>
 <td>Numeric: 2 digits + zero padded</td>
 <td>00... 59</td>
 </tr>
 <tr>
 <td>Fractional seconds</td>
 <td>S</td>
 <td>Numeric: 1 digit</td>
 <td>0... 9</td>
 </tr>
 <tr>
 <td></td>
 <td>SS</td>
 <td>Numeric: 2 digits + zero padded</td>
 <td>00... 99</td>
 </tr>
 <tr>
 <td></td>
 <td>SSS</td>
 <td>Numeric: 3 digits + zero padded (= milliseconds)</td>
 <td>000... 999</td>
 </tr>
 <tr>
 <td>Zone</td>
 <td>z, zz &amp; zzz</td>
 <td>Short specific non location format (fallback to O)</td>
 <td>GMT-8</td>
 </tr>
 <tr>
 <td></td>
 <td>zzzz</td>
 <td>Long specific non location format (fallback to OOOO)</td>
 <td>GMT-08:00</td>
 </tr>
 <tr>
 <td></td>
 <td>Z, ZZ &amp; ZZZ</td>
 <td>ISO8601 basic format</td>
 <td>-0800</td>
 </tr>
 <tr>
 <td></td>
 <td>ZZZZ</td>
 <td>Long localized GMT format</td>
 <td>GMT-8:00</td>
 </tr>
 <tr>
 <td></td>
 <td>ZZZZZ</td>
 <td>ISO8601 extended format + Z indicator for offset 0 (= XXXXX)</td>
 <td>-08:00</td>
 </tr>
 <tr>
 <td></td>
 <td>O, OO &amp; OOO</td>
 <td>Short localized GMT format</td>
 <td>GMT-8</td>
 </tr>
 <tr>
 <td></td>
 <td>OOOO</td>
 <td>Long localized GMT format</td>
 <td>GMT-08:00</td>
 </tr>
 </table>
 */
export const LocaleDateTime: any = {
    DATE_FORMAT: 'dd.MM.yyyy',
    DATE_TIME_FORMAT: 'dd.MM.yyyy HH:mm:ss',
    DATE_TIME_FORMAT_HHMM: 'dd.MM.yyyy HH:mm',
    PRIMENG_DATE_FORMAT: 'dd.mm.yy',
    MOMENT_DATE_FORMAT: 'DD.MM.YYYY',
    JSON_DATE_TIMEFORMAT: 'YYYY-MM-DDTHH:mm:ssZZ',
    en: {
        firstDayOfWeek: 0,
        dayNames: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
        dayNamesShort: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
        dayNamesMin: ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'],
        monthNames: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
        monthNamesShort: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        today: 'Today',
        clear: 'Clear'
    },
    ru: {
        firstDayOfWeek: 1,
        dayNames: ['Воскресение', 'Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота'],
        dayNamesShort: ['Вск', 'Пон', 'Втр', 'Срд', 'Чтв', 'Пят', 'Сбт'],
        dayNamesMin: ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'],
        monthNames: ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'],
        monthNamesShort: ['Янв', 'Фев', 'Мар', 'Апр', 'Май', 'Июн', 'Июл', 'Авг', 'Сен', 'Окт', 'Ноя', 'Дек'],
        today: 'Сегодня',
        clear: 'Очистить'
    }
};


