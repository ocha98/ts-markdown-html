import markdownToHtml from "../src/index"

describe('No XSS Vulnerability', () => {
    test('HTML special characters', async () =>  {
      const html = await markdownToHtml('<>&\'"');
      expect(html).toMatch('<p>&lt;&gt;&amp;&#x27;&quot;</p>');      
    })
    
    test('Script tag removal', async () => {
      const html = await markdownToHtml('<script>alert("XSS!")</script>');
      expect(html).toMatch('');
    });

    test('Onload attribute removal', async () => {
      const html = await markdownToHtml("<img src='dummy.jpg' onload='alert(\"XSS\");'  />");
      expect(html).toMatch('<img src="dummy.jpg">')
    })

    test('Javascript URL removal', async () => {
      const html = await markdownToHtml('<img src="javascript:alert(0);">');
      expect(html).toMatch('<img>')
    })

    test('Javascript URL in link removal', async () => {
      const html = await markdownToHtml("[リンク](javascript:alert('XSS'))")
      expect(html).toMatch("<p><a>リンク</a></p>")
    })

    test('Javascript URL in image removal', async () => {
      const html = await markdownToHtml("![画像](javascript:alert('XSS'))")
      expect(html).toMatch('<img alt="画像">')
    })

    test('Malformed href attribute removal', async () => {
      const html = await markdownToHtml("<a href=\"java script:alert('XSS')\">hoge</a>")
      expect(html).toMatch("<p><a>hoge</a>")
    })

    test('Onmouseover attribute removal', async () => {
      const html = await markdownToHtml("<a onmouseover=\"alert('XSS)\">hoge</a>")
      expect(html).toMatch("<p><a>hoge</a>")
    })

    test('Onerror attribute in title removal', async () => {
      const html = await markdownToHtml("![img](https://example.com/ \"\\\" onerror=alert('XSS')\")")
      expect(html).toMatch('<p><img src="https://example.com/" alt="img" title="&#x22; onerror=alert(&#x27;XSS&#x27;)"></p>')
    })

    test('Code block special character encoding', async () => {
      const text = `
      \`\`\`
      <>&'"
      \`\`\`
      `
      const html = await markdownToHtml(text)
      expect(html).toContain("&lt;&gt;&amp;&#x27;&quot;")
    })

    test('Code block script tag encoding', async () => {
      const text = `
      \`\`\`
      <script>alert("XSS!")</script>
      \`\`\`
      `
      const html = await markdownToHtml(text)
      expect(html).toContain("&lt;script&gt;alert(&quot;XSS!&quot;)&lt;/script&gt;")
    })
    
    test('Inline code special character encoding', async () => {
      const html = await markdownToHtml("\`<>&'\"\`")
      expect(html).toContain("&lt;&gt;&amp;&#x27;&quot;")
    })

    test('Inline code script tag encoding', async () => {
      const html = await markdownToHtml("\`<script>alert(\"XSS!\")</script>\`")
      expect(html).toContain("&lt;script&gt;alert(&quot;XSS!&quot;)&lt;/script&gt;")
    })
});

