"""
HTML Report Generator
Creates a styled HTML version of the technical report that can be printed to PDF
"""

import markdown2
from pathlib import Path

def convert_markdown_to_html(markdown_file, html_file):
    """
    Convert Markdown file to styled HTML
    
    Args:
        markdown_file: Path to input Markdown file
        html_file: Path to output HTML file
    """
    # Read markdown content
    with open(markdown_file, 'r', encoding='utf-8') as f:
        markdown_content = f.read()
    
    # Convert markdown to HTML
    html_body = markdown2.markdown(
        markdown_content,
        extras=['fenced-code-blocks', 'tables', 'header-ids', 'break-on-newline']
    )
    
    # Create complete HTML document with print-friendly styling
    full_html = f"""<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Plant Disease Detection - Technical Report</title>
    <style>
        /* Print-friendly styles */
        @media print {{
            @page {{
                size: A4;
                margin: 2cm;
            }}
            
            body {{
                font-size: 10pt;
            }}
            
            h1 {{
                page-break-before: always;
            }}
            
            h1:first-of-type {{
                page-break-before: avoid;
            }}
            
            h1, h2, h3, h4, h5, h6 {{
                page-break-after: avoid;
            }}
            
            pre, blockquote, table {{
                page-break-inside: avoid;
            }}
            
            img {{
                max-width: 100%;
                page-break-inside: avoid;
            }}
        }}
        
        /* Screen styles */
        body {{
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            line-height: 1.6;
            color: #333;
            max-width: 900px;
            margin: 0 auto;
            padding: 20px;
            background-color: #f5f5f5;
        }}
        
        .container {{
            background-color: white;
            padding: 40px;
            box-shadow: 0 0 10px rgba(0,0,0,0.1);
        }}
        
        h1 {{
            color: #2d5016;
            font-size: 2.5em;
            margin-top: 40px;
            margin-bottom: 20px;
            border-bottom: 3px solid #6ba83e;
            padding-bottom: 10px;
        }}
        
        h1:first-child {{
            margin-top: 0;
        }}
        
        h2 {{
            color: #4a7c2c;
            font-size: 2em;
            margin-top: 35px;
            margin-bottom: 15px;
            border-bottom: 2px solid #a8d08d;
            padding-bottom: 8px;
        }}
        
        h3 {{
            color: #6ba83e;
            font-size: 1.5em;
            margin-top: 25px;
            margin-bottom: 12px;
        }}
        
        h4 {{
            color: #8b6f47;
            font-size: 1.2em;
            margin-top: 20px;
            margin-bottom: 10px;
        }}
        
        p {{
            margin-bottom: 15px;
            text-align: justify;
        }}
        
        ul, ol {{
            margin-bottom: 15px;
            padding-left: 30px;
        }}
        
        li {{
            margin-bottom: 8px;
        }}
        
        code {{
            background-color: #f4f4f4;
            padding: 2px 6px;
            border-radius: 3px;
            font-family: 'Courier New', Consolas, monospace;
            font-size: 0.9em;
            color: #c7254e;
        }}
        
        pre {{
            background-color: #f8f8f8;
            border: 1px solid #ddd;
            border-left: 4px solid #6ba83e;
            padding: 15px;
            margin: 20px 0;
            overflow-x: auto;
            border-radius: 4px;
        }}
        
        pre code {{
            background-color: transparent;
            padding: 0;
            color: #333;
        }}
        
        table {{
            width: 100%;
            border-collapse: collapse;
            margin: 20px 0;
            box-shadow: 0 2px 4px rgba(0,0,0,0.1);
        }}
        
        th {{
            background-color: #6ba83e;
            color: white;
            padding: 12px;
            text-align: left;
            font-weight: bold;
        }}
        
        td {{
            border: 1px solid #ddd;
            padding: 10px;
        }}
        
        tr:nth-child(even) {{
            background-color: #f9f9f9;
        }}
        
        tr:hover {{
            background-color: #f0f0f0;
        }}
        
        blockquote {{
            border-left: 4px solid #6ba83e;
            padding-left: 20px;
            margin-left: 0;
            color: #666;
            font-style: italic;
            background-color: #f9f9f9;
            padding: 15px 20px;
            margin: 20px 0;
        }}
        
        hr {{
            border: none;
            border-top: 2px solid #6ba83e;
            margin: 30px 0;
        }}
        
        strong {{
            color: #2d5016;
            font-weight: 600;
        }}
        
        a {{
            color: #4a7c2c;
            text-decoration: none;
        }}
        
        a:hover {{
            text-decoration: underline;
        }}
        
        .print-button {{
            position: fixed;
            top: 20px;
            right: 20px;
            background-color: #6ba83e;
            color: white;
            padding: 12px 24px;
            border: none;
            border-radius: 5px;
            cursor: pointer;
            font-size: 16px;
            box-shadow: 0 2px 5px rgba(0,0,0,0.2);
            z-index: 1000;
        }}
        
        .print-button:hover {{
            background-color: #4a7c2c;
        }}
        
        @media print {{
            .print-button {{
                display: none;
            }}
            
            .container {{
                box-shadow: none;
                padding: 0;
            }}
            
            body {{
                background-color: white;
                padding: 0;
            }}
        }}
        
        /* Cover page */
        .cover {{
            text-align: center;
            padding: 100px 0;
            margin-bottom: 50px;
        }}
        
        .cover h1 {{
            font-size: 3em;
            border: none;
            margin-bottom: 20px;
        }}
        
        .cover .subtitle {{
            font-size: 1.5em;
            color: #666;
            margin-bottom: 40px;
        }}
        
        .cover .metadata {{
            font-size: 1.1em;
            color: #888;
            margin-top: 60px;
        }}
    </style>
</head>
<body>
    <button class="print-button" onclick="window.print()">🖨️ Print to PDF</button>
    <div class="container">
        {html_body}
    </div>
    
    <script>
        // Add print instructions
        console.log('To save as PDF: Click the Print button or press Ctrl+P, then select "Save as PDF" as the printer.');
    </script>
</body>
</html>"""
    
    # Write HTML file
    with open(html_file, 'w', encoding='utf-8') as f:
        f.write(full_html)
    
    print(f"✅ HTML report created: {html_file}")
    print(f"📄 File size: {Path(html_file).stat().st_size / 1024:.2f} KB")
    print(f"\n📍 Location: {Path(html_file).absolute()}")
    print("\n🖨️  To convert to PDF:")
    print("   1. Open the HTML file in your browser")
    print("   2. Click the 'Print to PDF' button (or press Ctrl+P)")
    print("   3. Select 'Save as PDF' or 'Microsoft Print to PDF'")
    print("   4. Save the PDF file")

if __name__ == "__main__":
    # File paths
    markdown_file = "FINAL_YEAR_PROJECT_REPORT.md"
    html_file = "Final_Year_Project_Report.html"
    
    # Convert
    try:
        convert_markdown_to_html(markdown_file, html_file)
        print("\n🎉 HTML generation complete!")
    except Exception as e:
        print(f"❌ Error generating HTML: {e}")
        import traceback
        traceback.print_exc()
