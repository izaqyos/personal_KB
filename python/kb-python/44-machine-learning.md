---
type: reference
title: machine learning
description: "Legacy Python KB section: machine learning (tutorial point python machine learning, setup, What is machine_learning)"
tags: [machine-learning, python, legacy]
generated: { by: "human:izaqyos", at: "2026-10-14T00:00:00Z" }
stale_after: "2027-04-14T00:00:00Z"
sources:
  - { id: py2-sunset, resource: "https://www.python.org/doc/sunset-python-2/", title: "Sunsetting Python 2" }
  - { id: pypa-venv, resource: "https://packaging.python.org/en/latest/guides/installing-using-pip-and-virtual-environments/", title: "Install packages in a virtual environment using pip and venv — Python Packaging User Guide" }
  - { id: py3-whatsnew, resource: "https://docs.python.org/3/whatsnew/3.0.html", title: "What's New In Python 3.0" }
status: stable
capture_type: source
legacy_source: "python/KB_python#41"
---

# machine learning

[↑ KB_python](/python/kb-python/README.md)

## 41.1 tutorial point python machine learning

```text
https://www.tutorialspoint.com/machine_learning_with_python/index.htm
```

### 41.1.1 setup

> Updated 2026-10 to current practice.[^py2-sunset]

```text
Libraries and Packages
To understand machine learning, you need to have basic knowledge of Python programming. In addition, there are a number of libraries and packages generally used in performing various machine learning tasks as listed below −

numpy − is used for its N-dimensional array objects

pandas − is a data analysis library that includes dataframes

matplotlib − is 2D plotting library for creating graphs and plots

scikit-learn − the algorithms used for data analysis and data mining tasks

seaborn − a data visualization library based on matplotlib

Installation
```

The original tutorial offered Python 2.7 or 3.x, via python.org or the Anaconda distribution, and checked versions with Python 2 `print` statements. Python 2 reached end of life on 2020-01-01; use Python 3 only.[^py2-sunset]

**Method 1: python.org / OS Python with a virtual environment and pip.** Install Python 3 from python.org or your package manager (for example `sudo apt install python3 python3-venv` on Debian/Ubuntu), then keep the ML libraries in a per-project virtual environment instead of installing them globally:[^pypa-venv]

```bash
cd ~/Desktop/work/code/python/machine_learning
python3 -m venv .venv
source .venv/bin/activate          # Windows: .venv\Scripts\activate
python -m pip install --upgrade pip
python -m pip install numpy pandas matplotlib seaborn scikit-learn
```

**Method 2: conda.** A conda distribution (Anaconda, or the smaller Miniconda/Miniforge) bundles Python 3 with numpy, scikit-learn, matplotlib and Jupyter. Create a separate environment per project rather than using the base one:

```bash
conda create -n ml python=3 numpy pandas matplotlib seaborn scikit-learn
conda activate ml
```

Check the installation; `print` is a function in Python 3:[^py3-whatsnew]

```python
import numpy, matplotlib, pandas, seaborn, sklearn

for mod in (numpy, matplotlib, pandas, seaborn, sklearn):
    print(mod.__name__, mod.__version__)
```

Personal note: in 2018 `python3` printed a `SyntaxError` at startup because `~/.pythonrc` (the `PYTHONSTARTUP` file) still had a Python 2 `print` statement on line 110. The Python 3 form is:

```python
import os, time
print("Welcome %s, time is %s. Have a good session :-) " % (os.environ['USER'], time.strftime('%X %x %Z')))
```

### 41.1.2 What is machine_learning

```text
Machine Learning (ML) is an automated learning with little or no human intervention. It involves programming computers so that they learn from the available inputs. The main purpose of machine learning is to explore and construct algorithms that can learn from the previous data and make predictions on new input data.

The input to a learning algorithm is training data, representing experience, and the output is any expertise, which usually takes the form of another algorithm that can perform a task. The input data to a machine learning system can be numerical, textual, audio, visual, or multimedia. The corresponding output data of the system can be a floating-point number, for instance, the velocity of a rocket, an integer representing a category or a class, for example, a pigeon or a sunflower from image recognition.

In this chapter, we will learn about the training data our programs will access and how learning process is automated and how the success and performance of such machine learning algorithms is evaluated.

Concepts of Learning
Learning is the process of converting experience into expertise or knowledge.

Learning can be broadly classified into three categories, as mentioned below, based on the nature of the learning data and interaction between the learner and the environment.

Supervised Learning
Unsupervised Learning
Semi-supervised Learning
Similarly, there are four categories of machine learning algorithms as shown below −

Supervised learning algorithm
Unsupervised learning algorithm
Semi-supervised learning algorithm
Reinforcement learning algorithm
However, the most commonly used ones are supervised and unsupervised learning.

Supervised Learning
Supervised learning is commonly used in real world applications, such as face and speech recognition, products or movie recommendations, and sales forecasting. Supervised learning can be further classified into two types - Regression and Classification.

Regression trains on and predicts a continuous-valued response, for example predicting real estate prices.

Classification attempts to find the appropriate class label, such as analyzing positive/negative sentiment, male and female persons, benign and malignant tumors, secure and unsecure loans etc.

In supervised learning, learning data comes with description, labels, targets or desired outputs and the objective is to find a general rule that maps inputs to outputs. This kind of learning data is called labeled data. The learned rule is then used to label new data with unknown outputs.

Supervised learning involves building a machine learning model that is based on labeled samples. For example, if we build a system to estimate the price of a plot of land or a house based on various features, such as size, location, and so on, we first need to create a database and label it. We need to teach the algorithm what features correspond to what prices. Based on this data, the algorithm will learn how to calculate the price of real estate using the values of the input features.

Supervised learning deals with learning a function from available training data. Here, a learning algorithm analyzes the training data and produces a derived function that can be used for mapping new examples. There are many supervised learning algorithms such as Logistic Regression, Neural networks, Support Vector Machines (SVMs), and Naive Bayes classifiers.

Common examples of supervised learning include classifying e-mails into spam and not-spam categories, labeling webpages based on their content, and voice recognition.

Unsupervised Learning
Unsupervised learning is used to detect anomalies, outliers, such as fraud or defective equipment, or to group customers with similar behaviors for a sales campaign. It is the opposite of supervised learning. There is no labeled data here.

When learning data contains only some indications without any description or labels, it is up to the coder or to the algorithm to find the structure of the underlying data, to discover hidden patterns, or to determine how to describe the data. This kind of learning data is called unlabeled data.

Suppose that we have a number of data points, and we want to classify them into several groups. We may not exactly know what the criteria of classification would be. So, an unsupervised learning algorithm tries to classify the given dataset into a certain number of groups in an optimum way.

Unsupervised learning algorithms are extremely powerful tools for analyzing data and for identifying patterns and trends. They are most commonly used for clustering similar input into logical groups. Unsupervised learning algorithms include Kmeans, Random Forests, Hierarchical clustering and so on.

Semi-supervised Learning
If some learning samples are labeled, but some other are not labeled, then it is semi-supervised learning. It makes use of a large amount of unlabeled data for training and a small amount of labeled data for testing. Semi-supervised learning is applied in cases where it is expensive to acquire a fully labeled dataset while more practical to label a small subset. For example, it often requires skilled experts to label certain remote sensing images, and lots of field experiments to locate oil at a particular location, while acquiring unlabeled data is relatively easy.

Reinforcement Learning
Here learning data gives feedback so that the system adjusts to dynamic conditions in order to achieve a certain objective. The system evaluates its performance based on the feedback responses and reacts accordingly. The best known instances include self-driving cars and chess master algorithm AlphaGo.

Purpose of Machine Learning
Machine learning can be seen as a branch of AI or Artificial Intelligence, since, the ability to change experience into expertise or to detect patterns in complex data is a mark of human or animal intelligence.

As a field of science, machine learning shares common concepts with other disciplines such as statistics, information theory, game theory, and optimization.

As a subfield of information technology, its objective is to program machines so that they will learn.

However, it is to be seen that, the purpose of machine learning is not building an automated duplication of intelligent behavior, but using the power of computers to complement and supplement human intelligence. For example, machine learning programs can scan and process huge databases detecting patterns that are beyond the scope of human perception.
```

### 41.1.3 data preprocessing

#### 41.1.3.1 mean, std, scale

```text
import numpy as np

from sklearn import preprocessing

#We imported a couple of packages. Let's create some sample data and add the line to this file:

input_data = np.array([[3, -1.5, 3, -6.4], [0, 3, -1.3, 4.1], [1, 2.3, -2.9, -4.3]])
data_standardized = preprocessing.scale(input_data)
print "\nMean = ", data_standardized.mean(axis = 0)
print "Std deviation = ", data_standardized.std(axis = 0)

Mean removal
It involves removing the mean from each feature so that it is centered on zero. Mean removal helps in removing any bias from the features.

You can use the above code for mean removal −

mean removal: It's the sum of n items divided by n. Not difficult. Removal in this context is just mathematical subtraction. To remove a mean from, say, a vector of numbers, sum the numbers, divide the sum by the number of elements in the vector, and subtract that number from each element in the vector.

Scaling
The values of every feature in a data point can vary between random values. So, it is important to scale them so that this matches specified rules.

You can use the following code for scaling −

data_scaler = preprocessing.MinMaxScaler(feature_range = (0, 1))
data_scaled = data_scaler.fit_transform(input_data)
print "\nMin max scaled data = ", data_scaled
Now run the code and you can observe the following output −

Min max scaled data = [ [ 1. 0. 1. 0. ]
                        [ 0. 1. 0.27118644 1. ]
                        [ 0.33333333 0.84444444 0. 0.2 ]
]
Note that all the values have been scaled between the given range.
```

#### 41.1.3.2 Normalization

```text
Normalization involves adjusting the values in the feature vector so as to measure them on a common scale. Here, the values of a feature vector are adjusted so that they sum up to 1. We add the following lines to the prefoo.py file −

You can use the following code for normalization −

data_normalized = preprocessing.normalize(input_data, norm  = 'l1')
print "\nL1 normalized data = ", data_normalized
Now run the code and you can observe the following output −

L1 normalized data = [  [ 0.21582734 -0.10791367 0.21582734 -0.46043165]
                        [ 0. 0.35714286 -0.1547619 0.48809524]
                        [ 0.0952381 0.21904762 -0.27619048 -0.40952381]
]
Normalization is used to ensure that data points do not get boosted due to the nature of their features.
```

#### 41.1.3.3 One Hot Encoding

#### 41.1.3.3.1 One Hot Encoding explained

```text
https://medium.com/@michaeldelsole/what-is-one-hot-encoding-and-how-to-do-it-f0ae272f1179

In my words.
Instead of giving categories a number (which can lead to errors since if you give each category a weight according to its number you introduce bias)
represent each category is a k bit number (where k is # categories) with all 0 but nth bit is on (for category n)

                41.1.3.3.2

It may be required to deal with numerical values that are few and scattered, and you may not need to store these values. In such situations you can use One Hot Encoding technique.

If the number of distinct values is k, it will transform the feature into a k-dimensional vector where only one value is 1 and all other values are 0.

You can use the following code for one hot encoding −

encoder = preprocessing.OneHotEncoder()
encoder.fit([  [0, 2, 1, 12], 
               [1, 3, 5, 3], 
               [2, 3, 2, 12], 
               [1, 2, 4, 3]
])
encoded_vector = encoder.transform([[2, 3, 5, 3]]).toarray()
print "\nEncoded vector =", encoded_vector
Now run the code and you can observe the following output −

Encoded vector = [[ 0. 0. 1. 0. 1. 0. 0. 0. 1. 1. 0.]]
In the example above, let us consider the third feature in each feature vector. The values are 1, 5, 2, and 4.

There are four separate values here, which means the one-hot encoded vector will be of length 4. If we want to encode the value 5, it will be a vector [0, 1, 0, 0]. Only one value can be 1 in this vector. The second element is 1, which indicates that the value is 5.
```

#### 41.1.3.4 Label Encoding

```text
In supervised learning, we mostly come across a variety of labels which can be in the form of numbers or words. If they are numbers, then they can be used directly by the algorithm. However, many times, labels need to be in readable form. Hence, the training data is usually labelled with words.

Label encoding refers to changing the word labels into numbers so that the algorithms can understand how to work on them. Let us understand in detail how to perform label encoding −

Create a new Python file, and import the preprocessing package −

from sklearn import preprocessing
label_encoder = preprocessing.LabelEncoder()
input_classes = ['suzuki', 'ford', 'suzuki', 'toyota', 'ford', 'bmw']
label_encoder.fit(input_classes)
print "\nClass mapping:"
for i, item in enumerate(label_encoder.classes_):
print item, '-->', i
Now run the code and you can observe the following output −

Class mapping:
bmw --> 0
ford --> 1
suzuki --> 2
toyota --> 3
As shown in above output, the words have been changed into 0-indexed numbers. Now, when we deal with a set of labels, we can transform them as follows −

labels = ['toyota', 'ford', 'suzuki']
encoded_labels = label_encoder.transform(labels)
print "\nLabels =", labels
print "Encoded labels =", list(encoded_labels)
Now run the code and you can observe the following output −

Labels = ['toyota', 'ford', 'suzuki']
Encoded labels = [3, 1, 2]
This is efficient than manually maintaining mapping between words and numbers. You can check by transforming numbers back to word labels as shown in the code here −

encoded_labels = [3, 2, 0, 2, 1]
decoded_labels = label_encoder.inverse_transform(encoded_labels)
print "\nEncoded labels =", encoded_labels
print "Decoded labels =", list(decoded_labels)
Now run the code and you can observe the following output −

Encoded labels = [3, 2, 0, 2, 1]
Decoded labels = ['toyota', 'suzuki', 'bmw', 'suzuki', 'ford']
From the output, you can observe that the mapping is preserved perfectly.

            41.1.3.5
```

## 41.2 Data analysis

### 41.2.1 Loading the Dataset

```text
We can load the data directly from the UCI Machine Learning repository. Note that here we are using pandas to load the data. We will also use pandas next to explore the data both with descriptive statistics and data visualization. Observe the following code and note that we are specifying the names of each column when loading the data.

import pandas
data = ‘pima_indians.csv’
names = ['Pregnancies', 'Glucose', 'BloodPressure', 'SkinThickness', 'Insulin', ‘Outcome’]
dataset = pandas.read_csv(data, names = names)
When you run the code, you can observe that the dataset loads and is ready to be analyzed. Here, we have downloaded the pima_indians.csv file and moved it into our working directory and loaded it using the local file name.

Summarizing the Dataset
Summarizing the data can be done in many ways as follows −

Check dimensions of the dataset
List the entire data
View the statistical summary of all attributes
Breakdown of the data by the class variable
Dimensions of Dataset
You can use the following command to check how many instances (rows) and attributes (columns) the data contains with the shape property.

print(dataset.shape)
Then, for the code that we have discussed, we can see 769 instances and 6 attributes −

(769, 6)
List the Entire Data
You can view the entire data and understand its summary −

print(dataset.head(20))
This command prints the first 20 rows of the data as shown −

Sno Pregnancies Glucose BloodPressure SkinThickness Insulin Outcome
1        6        148         72           35          0       1
2        1         85         66           29          0       0
3        8        183         64            0          0       1
4        1         89         66           23         94       0
5        0        137         40           35        168       1
6        5        116         74            0          0       0
7        3         78         50           32         88       1
8       10        115          0            0          0       0
9        2        197         70           45        543       1
10       8        125         96            0          0       1
11       4        110         92            0          0       0
12      10        168         74            0          0       1
13      10        139         80            0          0       0
14       1        189         60           23        846       1
15       5        166         72           19        175       1
16       7        100          0            0          0       1
17       0        118         84           47        230       1
18       7        107         74            0          0       1
19       1        103         30           38         83       0
View the Statistical Summary
You can view the statistical summary of each attribute, which includes the count, unique, top and freq, by using the following command.

print(dataset.describe())
The above command gives you the following output that shows the statistical summary of each attribute −

         Pregnancies Glucose BloodPressur SkinThckns Insulin Outcome
count       769       769       769         769       769     769
unique       18       137        48          52       187       3
top           1       100        70           0         0       0
freq        135        17        57         227       374     500
Breakdown the Data by Class Variable
You can also look at the number of instances (rows) that belong to each outcome as an absolute count, using the command shown here −

print(dataset.groupby('Outcome').size())
Then you can see the number of outcomes of instances as shown −

Outcome
0         500
1         268
Outcome     1
dtype: int64
```

### 41.2.2 Data Visualization

```text
You can visualize data using two types of plots as shown −

Univariate plots to understand each attribute

Multivariate plots to understand the relationships between attributes

Univariate Plots
Univariate plots are plots of each individual variable. Consider a case where the input variables are numeric, and we need to create box and whisker plots of each. You can use the following code for this purpose.

import pandas
import matplotlib.pyplot as plt
data = 'iris_df.csv'
names = ['sepal-length', 'sepal-width', 'petal-length', 'petal-width', 'class']
dataset = pandas.read_csv(data, names=names)
dataset.plot(kind='box', subplots=True, layout=(2,2), sharex=False, sharey=False)
plt.show()
You can see the output with a clearer idea of the distribution of the input attributes as shown −

Univariate Plots
Box and Whisker Plots
You can create a histogram of each input variable to get an idea of the distribution using the commands shown below −

#histograms
dataset.hist()
plt().show()
Box and Whisker Plots
From the output, you can see that two of the input variables have a Gaussian distribution. Thus these plots help in giving an idea about the algorithms that we can use in our program.

Multivariate Plots
Multivariate plots help us to understand the interactions between the variables.

Scatter Plot Matrix
First, let’s look at scatterplots of all pairs of attributes. This can be helpful to spot structured relationships between input variables.

from pandas.plotting import scatter_matrix
scatter_matrix(dataset)
plt.show()
You can observe the output as shown −

Scatter Plot Matrix
Observe that in the output there is a diagonal grouping of some pairs of attributes. This indicates a high correlation and a predictable relationship.

        41.2.3
    41.3
```

[^py2-sunset]: Sunsetting Python 2
[^pypa-venv]: Install packages in a virtual environment using pip and venv — Python Packaging User Guide
[^py3-whatsnew]: What's New In Python 3.0
