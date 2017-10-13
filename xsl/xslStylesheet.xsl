<xsl:stylesheet version="1.0"
xmlns:xsl="http://www.w3.org/1999/XSL/Transform">

<xsl:output method="html" />

    <xsl:template match="template">

        <html>
            <head>	
                <meta charset="UTF-8"/>
                <meta name="viewport" content="width=device-width, initial-scale=1.0"/> 
                <link  rel="stylesheet" type="text/css" href="../css/style.css" />
                <title>Online Food Deliveries Newcastle</title>

                <script src="../js/myJavaScripts.js" type="text/javascript">

                </script>

            </head>
		    <body>

                <xsl:apply-templates select="restaurants/restaurant"/>
                <xsl:apply-templates select="other"/>

		    </body>
	   </html>

    </xsl:template>

    <xsl:template match="restaurants/restaurant">

        <h1>Restaurant</h1>
        <xsl:value-of select="."/>
        <xsl:apply-templates select="about"/>
        

    
    </xsl:template>

    <xsl:template match="about">

        <img alt="Logo">
            <xsl:attribute name="src">
                <xsl:value-of select="restaurantPicture"/>			
            </xsl:attribute>			
	    </img>

    </xsl:template>

    <xsl:template match="other">

    <xsl:value-of select="."/>

    </xsl:template>
	
</xsl:stylesheet> 