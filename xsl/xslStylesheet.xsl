<xsl:stylesheet version="1.0"
xmlns:xsl="http://www.w3.org/1999/XSL/Transform">

<xsl:output method="html" />

    <xsl:template match="/">

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
		  
                <xsl:apply-templates select="restaurant"/>
			
		    </body>
	   </html>
	   
    </xsl:template>

    <xsl:template match="restaurants">

        <xsl:apply-templates select="resaurants/restaurant"/>

    </xsl:template> 

    <xsl:template match="resaurants/restaurant">

        <h1>Restaurant</h1>
        <xsl:value-of select="."/>
        <xsl:apply-templates select="restaurantLogo"/>
    
    </xsl:template>

    <xsl:variable name="image-dir">../images</xsl:variable>

    <xsl:template match="restaurantLogo">
        <img src="{$image-dir}/{restaurantPicture}"/>
        <p>test</p>
    </xsl:template>
	
</xsl:stylesheet> 