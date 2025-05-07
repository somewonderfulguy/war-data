type Props = {
  url: string
  name: string
  lang?: 'en' | 'pl' | 'ua' | 'ja'
}

export const MagicLinkMail = ({ name, url, lang = 'en' }: Props) => (
  <table
    border={0}
    cellPadding={0}
    cellSpacing={0}
    role="presentation"
    width="100%"
    style={{
      marginLeft: 'auto',
      marginRight: 'auto',
      marginTop: '40px',
      marginBottom: '40px',
      backgroundColor: '#f0ede3',
      borderRadius: '0.25rem',
      borderWidth: '1px',
      borderStyle: 'solid',
      borderColor: '#cec2af',
      padding: '20px',
      maxWidth: '37.5em',
      boxSizing: 'border-box'
    }}
  >
    <tbody>
      <tr style={{ width: '100%' }}>
        <td>
          <p
            style={{
              marginLeft: '0px',
              marginRight: '0px',
              padding: '0px',
              textAlign: 'center',
              fontSize: '24px',
              fontWeight: 400,
              color: '#382609',
              lineHeight: '24px',
              marginTop: '30px',
              marginBottom: '16px'
            }}
          >
            {lang === 'en' && `Log in as ${name} to War Data.`}
            {lang === 'pl' && `Zaloguj się jako ${name} do War Data.`}
            {lang === 'ua' && `Увійти як ${name} до War Data.`}
            {lang === 'ja' && `ログイン ${name} War Data.`}
          </p>
          <table
            align="center"
            width="100%"
            border={0}
            cellPadding={0}
            cellSpacing={0}
            role="presentation"
            style={{
              marginBottom: '32px',
              marginTop: '32px',
              textAlign: 'center'
            }}
          >
            <tbody>
              <tr>
                <td>
                  <a
                    href={url}
                    target="_blank"
                    rel="noreferrer"
                    style={{
                      borderRadius: '0.25rem',
                      backgroundColor: '#382609',
                      paddingLeft: '1rem',
                      paddingRight: '1rem',
                      paddingTop: '0.75rem',
                      paddingBottom: '0.75rem',
                      textAlign: 'center',
                      fontSize: '16px',
                      fontWeight: '600',
                      color: '#f0ede3',
                      textDecorationLine: 'none',
                      lineHeight: '100%',
                      textDecoration: 'none',
                      display: 'inline-block',
                      maxWidth: '100%',
                      padding: '12px 16px 12px 16px'
                    }}
                  >
                    <span
                      style={{
                        maxWidth: '100%',
                        display: 'inline-block',
                        lineHeight: '120%'
                      }}
                    >
                      {lang === 'en' && 'Log in'}
                      {lang === 'pl' && 'Zaloguj się'}
                      {lang === 'ua' && 'Увійти'}
                      {lang === 'ja' && 'ログインする'}
                    </span>
                  </a>
                </td>
              </tr>
            </tbody>
          </table>
        </td>
      </tr>
      <tr style={{ width: '100%' }}>
        <td>
          <p
            style={{
              fontSize: '12px',
              lineHeight: '24px',
              color: '#382609',
              marginBottom: '25px',
              textAlign: 'center'
            }}
          >
            {lang === 'en' && ' If you did not request this email you can safely ignore it.'}
            {lang === 'pl' && ' Jeśli nie żądałeś tego e-maila, możesz go zignorować.'}
            {lang === 'ua' &&
              ' Якщо ви не запитували цей електронний лист, ви можете його проігнорувати.'}
            {lang === 'ja' && ' このメールをリクエストしていない場合は、安全に無視できます。'}
          </p>
        </td>
      </tr>
    </tbody>
  </table>
)
