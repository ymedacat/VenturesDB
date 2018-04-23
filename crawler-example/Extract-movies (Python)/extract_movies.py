from urllib import request
from urllib.request import Request, urlopen
from bs4 import BeautifulSoup
import chardet
import csv
import html5lib

if __name__ == "__main__":

    range_start = 15
    range_end = 18
    result_path = "C:/Users/ying2/VenturesDB/crawler-example/Extract-movies/Extract-movies-result"

    for movies_date in range(range_start, range_end):

        movies_date = str(movies_date)
    
        url = "https://wmoov.com/cinema/movies/28?date=2018-04-"+ movies_date +"&movie="
        req = Request(url, headers={'User-Agent': 'Mozilla/5.0'})
        webpage = urlopen(req).read()
        charset = chardet.detect(webpage)

        """
        # Other method to decode the website charset
        webpage = webpage.decode(charset['encoding'])
        """

        soup = BeautifulSoup(webpage, 'html5lib')

        movies = []

        with open(result_path + '/extracted_movies_2018-04-' + movies_date + '.csv', 'w', newline='', encoding='utf-8-sig') as f:
            thewriter = csv.writer(f)
            thewriter.writerow(['2018-04-' + movies_date])
            thewriter.writerow(['Movie name'])

            for movie in soup.select('.even a[rel~="nofollow"]'):
                movie = movie.text
                if movie != "購票":
                    if movie not in movies:
                        movies.append(movie)
                        print(movie)
                        thewriter.writerow([movie])


"""
# Write CSV File
    with open('extracteddata.csv', 'w', newline='') as f:
        thewriter = csv.writer(f)

        thewriter.writerow(['col1', 'col2', 'col3'])
        thewriter.writerow(['one', 'two', 'three'])
"""